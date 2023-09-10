const MyError = require('../exception')
const { Op, Sequelize } = require('sequelize')

const {
  NO_AUTH_ERROR_CODE,
  REQUEST_PARAMS_ERROR_CODE,
  NOT_FOUND_ERROR_CODE
} = require('../exception/errorCode')
const CodeModel = require('../model/code')

async function getCode(req, name) {
  // 获取当前用户的代码片段
  const snippetList = await CodeModel.findAll({
    where: {
      language: {
        [Op.like]: `%${name}%`
      }
    }
  })
  return snippetList
}

module.exports = {
  getCode
}
