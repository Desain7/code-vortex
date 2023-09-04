import { configureStore } from '@reduxjs/toolkit'
import {
  useSelector,
  useDispatch,
  TypedUseSelectorHook,
  shallowEqual
} from 'react-redux'

import demoReducer from './modules/demo'
// 创建Redux store
const store = configureStore({
  reducer: {
    demo: demoReducer // 测试用的reducer
  }
})

// 获取根状态类型和dispatch类型
type GetStateFnType = typeof store.getState
export type IRootState = ReturnType<GetStateFnType>
type DispatchType = typeof store.dispatch

// 自定义的钩子函数，用于获取根状态
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector

// 自定义的钩子函数，用于获取dispatch函数
export const useAppDispatch: () => DispatchType = useDispatch

// 浅比较相等性的函数
export const shallowEqualApp = shallowEqual

export default store
