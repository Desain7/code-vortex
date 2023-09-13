import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { test } from '@/api/demo'
import { message } from 'antd'

// 推荐模块的初始状态
interface ISystemState {
  message: string
}

const initialState: ISystemState = {
  message: ''
}

// 创建推荐模块的slice
const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    // 定义各个同步action对状态的修改逻辑
    changeMessageAction(state, { payload }) {
      if (state.message == payload) {
        state.message = ''
      } else {
        state.message = payload
      }
    }
  }
})

// 导出同步action
export const { changeMessageAction } = systemSlice.actions

export default systemSlice.reducer
