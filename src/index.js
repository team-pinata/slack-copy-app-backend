// generated
import config from './config';
import ExpressServer from './expressServer';
import logger from './logger';
import { connect } from './sequelize';

const launchServer = async () => {
  try {
    await connect();
    const expressServer = new ExpressServer(
      config.URL_PORT,
      config.OPENAPI_YAML,
    );
    await expressServer.setupMiddleware();
    await expressServer.launch();
    logger.info('Express server running');
  } catch (error) {
    logger.error(error);
  }
};

launchServer().catch((e) => logger.error(e));
