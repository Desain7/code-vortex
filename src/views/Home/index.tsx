import React, { memo, Suspense } from 'react'
import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import CodeEditor from '@/components/CodeEditor'
import { HomeWrapper } from './style'
import ItemCard from '@/components/ItemCard'
import { Layout } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'

interface IProps {
  children?: ReactNode
}

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
  padding: '2%'
}

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#3ba0e9'
}

const Home: FC<IProps> = () => {
  return (
    <HomeWrapper>
      {' '}
      <div className="home-container">
        <Layout hasSider>
          <Sider style={siderStyle} width={'25%'}>
            Sider
          </Sider>
          <Content style={contentStyle}>
            <ItemCard>666</ItemCard>
            <ItemCard></ItemCard>
            <ItemCard></ItemCard>
            <ItemCard></ItemCard>
            <ItemCard></ItemCard>
          </Content>
        </Layout>

        {/* 二级路由
        <Suspense fallback="">
          <Outlet />
        </Suspense> */}
      </div>
    </HomeWrapper>
  )
}
// memo 会对组件的 props 进行浅比较，只有当 props 发生变化时才会重新渲染组件
export default memo(Home)
