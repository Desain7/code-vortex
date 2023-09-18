const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const { stringify } = require('querystring')

/**
 * 用户模型
 *
 */
const UserModel = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: 'user',
    paranoid: true,
    deletedAt: 'isDelete',
    timestamps: false
  }
)

module.exports = UserModel
