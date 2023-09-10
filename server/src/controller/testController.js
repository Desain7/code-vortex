const MyError = require('../exception')
const {
  REQUEST_PARAMS_ERROR_CODE,
  NO_AUTH_ERROR_CODE
} = require('../exception/errorCode')
const { getCode } = require('../service/testService')

/**
 * 获取用户代码片段
 * @param {*} event
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function getUserCode(event, req, res) {
  const { name } = event
  return await getCode(req, name)
}

module.exports = {
  getUserCode
}
