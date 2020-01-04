// generated
import config from './config';
import ExpressServer from './expressServer';
import logger from './logger';

const launchServer = async () => {
  try {
    const expressServer = new ExpressServer(
      config.URL_PORT,
      config.OPENAPI_YAML,
    );
    await expressServer.launch();
    logger.info('Express server running');
  } catch (error) {
    logger.error(error);
    // await this.close();
  }
};

launchServer().catch((e) => logger.error(e));
