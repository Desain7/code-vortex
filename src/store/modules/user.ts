import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserConfig } from '@/api/user'

interface User {
  username: string
  email: string
  id?: string
}

// 推荐模块的初始状态
interface ISystemState {
  token: string
  login: boolean
  userConfig: User
}

const initialState: ISystemState = {
  token: '',
  login: true,
  userConfig: { username: '', email: '' }
}

export const fetchUserConfigAction = createAsyncThunk(
  'userData',
  (_, { dispatch }) => {
    // 获取用户信息
    getUserConfig().then((res) => {
      const { data, code } = res
      if (code == 10200) {
        dispatch(changeUserConfigAction(data.user))
        dispatch(changeLoginStatusAction(true))
      } else {
        dispatch(changeLoginStatusAction(false))
      }
    })
  }
)
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 定义各个同步action对状态的修改逻辑
    /**
     * 用户登录
     * @param state
     * @param param1
     */
    userLoginAction(state, { payload }) {
      state.token = payload
      // 根据 remember 的不同，将 token 存储到不同的 storage 中
      if (payload.remember) {
        localStorage.setItem('codevortex-token', payload.token)
        console.log('local')
      } else {
        sessionStorage.setItem('codevortex-token', payload.token)
        console.log('session')
      }
      state.login = true
    },
    setTokenAction(state, { payload }) {
      state.token = payload
    },
    changeLoginStatusAction(state, { payload }) {
      state.login = payload
    },
    changeUserConfigAction(state, { payload }) {
      state.userConfig = payload
    }
  }
})

// 导出同步action
export const {
  userLoginAction,
  changeLoginStatusAction,
  changeUserConfigAction,
  setTokenAction
} = userSlice.actions

export default userSlice.reducer
