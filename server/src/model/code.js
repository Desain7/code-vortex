const { DataTypes } = require('sequelize')
const sequelize = require('../db')

/**
 * 用户模型
 *
 */
const CodeModel = sequelize.define(
  'Code',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    used: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    view: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'code',
    paranoid: true,
    deletedAt: 'isDelete',
    timestamps: false
  }
)

module.exports = CodeModel
