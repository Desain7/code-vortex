import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { test } from '@/api/demo'
import { message } from 'antd'

interface Message {
  text: string
  type: 'success' | 'error' | 'info' | 'warning'
}
interface ISystemState {
  message: Message
}

const initialState: ISystemState = {
  message: { text: '', type: 'error' }
}

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    // 定义各个同步action对状态的修改逻辑
    changeMessageAction(state, { payload }) {
      if (state.message.text == payload.text) {
        state.message.text = ''
      } else {
        if (payload.type) {
          state.message.type = payload.type
          state.message.text = payload.text
        } else {
          state.message.type = 'error'
          state.message.text = payload.text
        }
      }
    }
  }
})

// 导出同步action
export const { changeMessageAction } = systemSlice.actions

export default systemSlice.reducer
