'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Buku, { through: 'UserBukus', foreignKey: 'userId', otherKey: 'bukuId' });
    }
  }
  User.init(
    {
      nama: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Nama is required'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Email is required'
          },
          isEmail: {
            args: true,
            msg: 'Email is not valid'
          }
        }
      },
      password: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Password is required'
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeBulkCreate: (users, opt) => {
          const hashedPassword = hashPassword(users.password);
          users.password = hashedPassword;
        }
      }
    });
  return User;
};