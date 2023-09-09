import React, { memo, Suspense } from 'react'
import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import CodeEditor from '@/components/CodeEditor'
import { HomeWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const Home: FC<IProps> = () => {
  return (
    <HomeWrapper>
      {' '}
      <div className="home-container">
        <CodeEditor></CodeEditor>
        {/* 二级路由 */}
        <Suspense fallback="">
          <Outlet />
        </Suspense>
      </div>
    </HomeWrapper>
  )
}
// memo 会对组件的 props 进行浅比较，只有当 props 发生变化时才会重新渲染组件
export default memo(Home)
