const jwt = require('jsonwebtoken')

const secret = 'Desain7'

function verifyToken(req, res, next) {
  // authorization 格式为 'Bearer [token]' 所以需要 split 后获取
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    // 未获取到 token，用户未登录
  } else {
    // 获取到了 token
    try {
      // 通过 jwt 对 token 进行校验
      const decoded = jwt.verify(token, secret)
      // 校验成功，请求体携带用户认证信息
    } catch (err) {
      // 捕获到错误，用户认证过期
      return res.status(401).json({
        message: '用户认证过期，请重新登陆！'
      })
    }
  }
  next()
}

module.exports = { verifyToken }
