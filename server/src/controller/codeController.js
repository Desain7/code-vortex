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
/**
 * Todo
 * 1. 新增代码片段
 * 2. 下载代码片段图片
 * 3. 生成代码片段短链接
 * 4. 删除代码片段
 * 5. 修改代码片段
 * 6. 点赞/取消点赞代码片段
 * 7. 用户通过任意方式使用代码片段后，used 字段加一
 */

module.exports = {
  getUserCode
}
