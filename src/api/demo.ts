import myRequest from '@/service'

// 测试方法
export function test() {
  return myRequest.get({
    url: '/test'
  })
}
