import { RouteObject, Navigate } from 'react-router-dom'
import React, { lazy } from 'react'

// 配置路由懒加载
const Home = lazy(() => import('@/views/Home'))
const CodeLib = lazy(() => import('@/views/CodeLib'))
const Chat = lazy(() => import('@/views/Chat'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'/home'} />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/codeLisb',
    element: <CodeLib />
  },
  {
    path: '/chat',
    element: <Chat />
  }
]

export default routes
