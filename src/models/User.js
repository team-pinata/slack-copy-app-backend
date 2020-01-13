import Sequelize from 'sequelize';

export default class User extends Sequelize.Model {}

export const init = (sequelize) => {
  User.init(
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
    },
  );
};
