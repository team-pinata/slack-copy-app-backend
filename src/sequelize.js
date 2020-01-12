import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import logger from './logger';

const {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
} = process.env;

// ./models配下を捜索し初期化する
const defineModels = (sequelize) => {
  const dirs = fs.readdirSync(path.join(__dirname, './models'));
  dirs.forEach((mp) => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const model = require(`./models/${mp}`);
    model.init(sequelize);
  });
};

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
    defineModels(sequelize);

    // TODO マイグレーションは分ける
    sequelize.sync();
  });
};
