import myRequest from '@/service'

interface CodeConfig {
  code: string
  language: string
  user: string
  name: string
}

/**
 * 添加代码片段
 * @param code 代码片段
 * @returns
 */
export function addCode(code: CodeConfig) {
  return myRequest.post({
    url: '/code/add',
    data: code
  })
}

export function getAllCode(filter: any) {
  return myRequest.get({
    url: '/code/get',
    params: filter
  })
}
