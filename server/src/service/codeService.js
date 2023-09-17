const MyError = require('../exception')
const { Op, Sequelize } = require('sequelize')

const {
  NO_AUTH_ERROR_CODE,
  REQUEST_PARAMS_ERROR_CODE,
  NOT_FOUND_ERROR_CODE
} = require('../exception/errorCode')
const CodeModel = require('../model/code')

async function getCode(req, name) {
  // 条件查询代码片段
  const snippetList = await CodeModel.findAll({
    where: {
      language: {
        [Op.like]: `%${name ?? ''}%`
      }
    }
  })
  return snippetList
}

async function addCode(req, code, name, language, user) {
  const date = new Date()
  const data = await CodeModel.create({
    name,
    content: code,
    language,
    createTime: date.getTime(),
    user_id: user,
    used: 0,
    view: 0
  })
  return { message: '添加成功', data }
}

module.exports = {
  getCode,
  addCode
}
