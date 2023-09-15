import { getUserConfig } from '@/api/user'
import { useAppDispatch } from '@/store'
import { setTokenAction } from '@/store/modules/user'

/**
 * 获取已缓存的 token
 * @returns
 */
export const getToken = () => {
  const dispatch = useAppDispatch()
  const token =
    localStorage.getItem('codevortex-token') ||
    sessionStorage.getItem('codevortex-token')
  if (token) {
    console.log(123123, token)
    // dispatch(changeUserConfigAction(user))
    dispatch(setTokenAction(token))
  }
  return token
}
