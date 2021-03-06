// const { Middleware } = require('swagger-express-middleware');
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { OpenApiValidator } from 'express-openapi-validator';
import swaggerUI from 'swagger-ui-express';
import yamljs from 'yamljs';
import logger from './logger';
import openapiRouter from './utils/openapiRouter';

export default class ExpressServer {
  constructor(port, openApiYaml) {
    this.port = port;
    this.app = express();
    this.openApiPath = openApiYaml;
    this.schema = yamljs.load(openApiYaml);
  }

  async setupMiddleware() {
    // this.setupAllowedMedia();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());

    // 本番稼働時はドキュメント公開はしない
    if (process.env.NODE_ENV !== 'production') {
      this.app.use('/spec', express.static(path.join(__dirname, 'api')));
      this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(this.schema));
    }

    await new OpenApiValidator({
      apiSpec: this.openApiPath,
    }).install(this.app);

    this.app.use(openapiRouter());
  }

  addErrorHandler() {
    this.app.use('*', (req, res) => {
      res.status(404);
      res.send(JSON.stringify({ error: `path ${req.baseUrl} doesn't exist` }));
    });
    /**
     * suppressed eslint rule: The next variable is required here, even though it's not used.
     *
     ** */
    // eslint-disable-next-line no-unused-vars
    this.app.use((error, req, res, next) => {
      const errorResponse =
        error.error || error.errors || error.message || 'Unknown error';
      res.status(error.status || 500);
      res.type('json');
      res.json({ error: errorResponse });
    });
  }

  async launch() {
    this.addErrorHandler();
    this.server = await this.app.listen(this.port, () => {
      logger.info(`server running on port ${this.port}`);
    });
    return this.server;
  }

  async close() {
    if (this.server !== undefined) {
      await this.server.close();
      logger.info(`Server on port ${this.port} shut down`);
    }
  }
}
