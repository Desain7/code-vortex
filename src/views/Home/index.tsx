import React, { memo, Suspense } from 'react'
import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const Discover: FC<IProps> = () => {
  return (
    <div>
      123123
      {/* 二级路由 */}
      <Suspense fallback="">
        <Outlet />
      </Suspense>
    </div>
  )
}

export default memo(Discover)
