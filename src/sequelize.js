import Sequelize from 'sequelize';
import logger from './logger';

const {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
} = process.env;

// eslint-disable-next-line import/prefer-default-export
export const connect = () => {
  const sequelize = new Sequelize(
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
    {
      host: DATABASE_HOST,
      dialect: 'mysql',
      logging: (...msg) => logger.info(msg[0]),
    },
  );

  return sequelize.authenticate().then(() => {
    logger.info('database authenticate: ok');
    sequelize.close();
  });
};
