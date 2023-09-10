/**
 * @type
 */
const routes = [
  {
    path: '/getCode',
    handlerFunction: require('./controller/testController').getUserCode,
    method: 'get',
    auth: false
  }
]

module.exports = routes
