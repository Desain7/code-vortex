const express = require('express')
const bodyParser = require('body-parser')
const { verifyToken } = require('./utils/verifyToken')
const MyError = require('./exception/index')
const http = require('http')
const { FORBIDDEN_ERROR_CODE } = require('./exception/errorCode')
const morgan = require('morgan')

// 限制请求大小
const requestLimit = '4096kb'

// 定义服务端的类
class ExpressServer {
  app
  contextPath
  server
  constructor() {
    this.app = express()
    // 上下文请求路径
    this.contextPath = '/api'
    // margan 中间件获取请求日志
    this.app.use(morgan('short'))
    // 解析请求体中的 url 编码的数据
    this.app.use(express.urlencoded({ extended: false, limit: requestLimit }))
    // 解析请求体中的 JSON 编码的数据
    this.app.use(express.json({ limit: requestLimit }))
    // 禁用 x-powered-by 头部，隐藏服务器信息
    this.app.set('x-powered-by', false)
    // 设置跨域相关的请求头
    this.app.all('*', (req, res, next) => {
      // 允许客户端发送包含凭据的跨域请求
      res.setHeader('Access-Control-Allow-Credentials', 'true')
      // 获取请求中的 origin 字段，即请求来源地址
      const origin = req.get('Origin')
      // 若存在 origin 字段，则说明请求跨域
      if (origin) {
        // 允许来自 origin 的跨域请求
        res.setHeader('Access-Control-Allow-Origin', origin)
      }
      // 允许跨域请求的方法
      res.setHeader(
        'Access-Control-Allow-Methods',
        'POST, GET, OPTIONS, DELETE, PUT'
      )
      // 允许跨域请求 header 携带哪些东西
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since, Authorization'
      )
      next()
    })
    this.server = http.createServer(this.app)
  }
  setRoute({ path, handlerFunction, method, auth }) {
    const handler = async (req, res) => {
      // 获取客户端真实 ip 地址
      const requestClientIp = getClientIp(req)
      // 无法获取到真实 IP 地址则禁止访问
      if (!requestClientIp) {
        return FORBIDDEN_ERROR_CODE
      }
      // 获取请求体数据
      const event = req.body
      let result
      try {
        // 开始请求的时间
        const startTime = new Date().getTime()
        let params
        if (event.file) {
          let eventCopy = { ...event }
          eventCopy.file = undefined
          params = JSON.stringify(eventCopy)
        } else {
          params = JSON.stringify(event)
        }
        console.log(
          `Request start path = ${req.path}, clientIp = ${requestClientIp}, params = ${params}`
        )
        // 等待 handler 处理请求
        console.log('han', handlerFunction)
        result = await handlerFunction(event, req, res)
        // 封装响应
        result = {
          code: 10200,
          data: result
        }
        console.log(
          `Request end path = ${
            req.path
          }, clientIp = ${requestClientIp}, params = ${params}, costTime = ${
            new Date().getTime() - startTime
          }`
        )
      } catch (e) {
        // 全局异常处理
        if (e instanceof MyError) {
          result = {
            code: e.code,
            message: e.message,
            data: null
          }
        } else {
          // 非已定义的错误则可能是系统内部出错
          result = {
            code: 500,
            data: null,
            message: 'server error'
          }
        }
        console.error(
          `req error path = ${
            req.path
          }, clientIp = ${requestClientIp}, params = ${JSON.stringify(event)}`,
          e
        )
      }
      res.send(result)
    }
    // 注册路由
    let routeParams = [this.contextPath + path]
    // 是否开启身份验证
    if (auth) {
      routeParams.push(verifyToken)
    }
    routeParams.push(handler)
    // 根据方法注册路由处理程序
    switch (method) {
      case 'post':
        this.app.post(...routeParams)
        break
      case 'get':
        this.app.get(...routeParams)
        break
    }
  }
  /**
   * 服务器开始监听端口
   * @param port 端口号
   */
  listen(port) {
    this.server.listen(port)
    let url = `http://localhost:${port}`
    if (this.contextPath) {
      url += this.contextPath
    }
    console.log(`Server start at ${url}, env = ${process.env.NODE_ENV}`)
  }
}

function getClientIp(req) {
  if (!req) {
    return ''
  }
  return (
    // 以下均为客户端 ip 地址，得到其中任意一个即可
    req.headers['x-forwarded-for'] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.connection?.socket?.remoteAddress ||
    req.ip
  )
}

module.exports.ExpressServer = ExpressServer
