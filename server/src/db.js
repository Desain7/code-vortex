const { Sequelize } = require('sequelize')
const { dbConfig } = require('./config/config')

/**
 * 创建数据库实例
 * @type {Sequelize}
 */
const sequelize = new Sequelize({
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.honst,
  port: dbConfig.port,
  dialect: 'mysql', // 数据库类型
  logging: console.log
})

// 测试数据库连接

sequelize
  .authenticate()
  .then(() => {
    console.log('MySQL connect success!')
  })
  .catch((e) => {
    console.log('MySQL connect fail', e)
  })

module.exports = sequelize
