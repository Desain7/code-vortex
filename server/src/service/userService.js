const MyError = require('../exception')
const { Op, Sequelize } = require('sequelize')

const {
  NO_AUTH_ERROR_CODE,
  REQUEST_PARAMS_ERROR_CODE,
  NOT_FOUND_ERROR_CODE
} = require('../exception/errorCode')
const UserModel = require('../model/user')
const md5 = require('md5')
const jwt = require('jsonwebtoken')

// 加盐
const SALT = 'Desain'

/**
 * 用户注册
 * @param {string | number} username 用户名
 * @param {string} password 密码
 * @param {string} email 用户邮箱
 * @returns
 */
async function userRegister(username, password, email) {
  const date = new Date()
  // 校验
  if (!username || !password || !email) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, '参数错误')
  }
  if (username.length > 32) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, '用户名过长')
  }
  const regEmail =
    /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (!regEmail.test(email)) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, '邮箱非法')
  }
  // 用户是否已存在
  let user = await UserModel.findOne({
    where: {
      [Op.or]: [{ username }, { email }]
    }
  })
  if (user) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, '该用户名或邮箱已被注册')
  }
  // 插入新用户
  const cryptoPassword = md5(password + SALT)
  user = await UserModel.create({
    username,
    password: cryptoPassword,
    email,
    createTime: date.getTime(),
    updateTime: date.getTime()
  })
  return user.id
}

/**
 *
 * @param {string | number} username 用户名
 * @param {string | number} password 密码
 * @param {*} req 请求体
 * @returns
 */
async function userLogin(username, password, req) {
  // 校验
  if (!username || !password) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, '参数错误')
  }
  const cryptoPassword = md5(password + SALT)
  // 查看用户是否已存在
  let user = await UserModel.findOne({
    attributes: { exclude: ['password'] },
    where: {
      username,
      password: cryptoPassword
    }
  })
  if (!user) {
    throw new MyError(NOT_FOUND_ERROR_CODE, '用户不存在或密码错误')
  }
  const payload = { id: user.id }
  // 盐
  const secret = 'Desain'
  const options = { expiresIn: '7d' } // 过期时间

  // jwt 生成 token
  const token = jwt.sign(payload, secret, options)
  // 登录成功
  return {
    user: user,
    token: `Bearer ${token}`
  }
}

async function getLoginUser(req) {
  let user = await UserModel.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.userId
    }
  })
  console.log('user', user)
  return {
    user: user
  }
}

module.exports = {
  userRegister,
  userLogin,
  getLoginUser
}
