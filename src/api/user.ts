import myRequest from '../service/index'

interface UserConfig {
  username: string | number
  password: string
  email?: string
}

export function userRegister(user: UserConfig) {
  return myRequest.post({
    url: '/register',
    data: user
  })
}
export function userLogin(user: UserConfig) {
  return myRequest.post({
    url: '/login',
    data: user
  })
}
export function getUserConfig() {
  return myRequest.get({ url: '/getUser' })
}
