const MyError = require('../exception')
const {
  REQUEST_PARAMS_ERROR_CODE,
  NO_AUTH_ERROR_CODE
} = require('../exception/errorCode')
const {
  userLogin,
  userRegister,
  getLoginUser
} = require('../service/userService')

/**
 * 用户注册
 * @param event
 * @param req
 * @param res
 */
async function userRegisterApi(event, req, res) {
  const { username, password, email } = event
  if (!username || !password || !email) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, '参数错误')
  }
  return await userRegister(username, password, email)
}

/**
 * 用户登录
 * @param event
 * @param req
 * @param res
 */
async function userLoginApi(event, req, res) {
  const { username, password } = event
  if (!username || !password) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, '参数错误')
  }
  let user = await userLogin(username, password, req)
  return user
}

/**
 * 用户注销
 * @param event
 * @param req
 * @param res
 */
// function userLogoutApi(event, req, res) {
//   if (!req.a) {
//     throw new MyError(NO_AUTH_ERROR_CODE, '未登录')
//   }
//   delete req.session.userInfo
//   return true
// }

/**
 * 获取用户信息
 * @param event
 * @param req
 * @param res
 */
async function getUserConfigApi(event, req, res) {
  return await getLoginUser(req)
}

module.exports = {
  userRegisterApi,
  userLoginApi,
  getUserConfigApi
}
