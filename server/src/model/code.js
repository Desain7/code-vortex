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
      allowNull: true
    },
    view: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    update_time: {
      type: DataTypes.DATE
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
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
