class MyError extends Error {
  code
  constructor(code, message) {
    super(message)
    this.code = code
    this.message = message
    this.name = 'MyError'
  }
}

module.exports = MyError
