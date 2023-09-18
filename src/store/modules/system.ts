import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface Message {
  text: string
  type: 'success' | 'error' | 'info' | 'warning'
}
interface ISystemState {
  message: Message
  showEditor: boolean
  editCode: string
}

const initialState: ISystemState = {
  message: { text: '', type: 'error' },
  showEditor: false,
  editCode: ''
}

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    // 定义各个同步action对状态的修改逻辑
    changeMessageAction(state, { payload }) {
      if (state.message.text == payload.text) {
        state.message.text = ''
        state.message.text = payload.text
      } else {
        if (payload.type) {
          state.message.type = payload.type
          state.message.text = payload.text
        } else {
          state.message.type = 'error'
          state.message.text = payload.text
        }
      }
    },
    changeEditorDisplayAction(state, { payload }) {
      state.showEditor = payload
    },
    changeEditCode(state, { payload }) {
      state.editCode = payload.editCode
    }
  }
})

// 导出同步action
export const {
  changeMessageAction,
  changeEditorDisplayAction,
  changeEditCode
} = systemSlice.actions

export default systemSlice.reducer
