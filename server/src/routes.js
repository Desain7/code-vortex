/**
 * @type
 */
const routes = [
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
  },
  {
    path: '/getUser',
    handlerFunction: require('./controller/userController').getUserConfigApi,
    method: 'get',
    auth: true
  },
  {
    path: '/code/get',
    handlerFunction: require('./controller/codeController').getUserCode,
    method: 'get',
    auth: false
  },
  {
    path: '/code/add',
    handlerFunction: require('./controller/codeController').addUserCode,
    method: 'post',
    auth: true
  }
]

module.exports = routes
