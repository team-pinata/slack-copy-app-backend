import Sequelize from 'sequelize';

export default class User extends Sequelize.Model {}

export const init = (sequelize) => {
  User.init(
    {
      name: {
        type: Sequelize.STRING,
        allownull: false,
      },
      email: {
        type: Sequelize.STRING,
        allownull: false,
      },
    },
    {
      sequelize,
    },
  );
};
