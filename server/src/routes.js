/**
 * @type
 */
const routes = [
  {
    path: '/getCode',
    handlerFunction: require('./controller/codeController').getUserCode,
    method: 'get',
    auth: false
  },
  {
    path: '/register',
    handlerFunction: require('./controller/userController').userRegisterApi,
    method: 'post',
    auth: false
  },
  {
    path: '/login',
    handlerFunction: require('./controller/userController').userLoginApi,
    method: 'post',
    auth: false
  }
]

module.exports = routes
