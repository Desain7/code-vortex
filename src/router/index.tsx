import { RouteObject, Navigate } from 'react-router-dom'
import React, { lazy } from 'react'

// 配置路由懒加载
const Home = lazy(() => import('@/views/Home'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'/home'} />
  },
  {
    path: '/home',
    element: <Home />
  }
]

export default routes
