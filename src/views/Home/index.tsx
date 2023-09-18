import React, { memo, Suspense, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import CodeEditor from '@/components/CodeEditor'
import { HomeWrapper } from './style'
import ItemCard from '@/components/ItemCard'
import { Layout, Pagination } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import CodeBlock from '@/components/CodeBlock'
import { getAllCode } from '@/api/code'

interface IProps {
  children?: ReactNode
}

const contentStyle: React.CSSProperties = {
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  // backgroundColor: '#108ee9',
  padding: '2%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

const siderStyle: React.CSSProperties = {
  lineHeight: '120px',
  color: '#fff'
  // backgroundColor: '#3ba0e9'
}

const Home: FC<IProps> = () => {
  const [codeList, setCodeList] = useState([])
  const [loading, setLoading] = useState(true)
  const getCodeList = async (filter?: any) => {
    const { code, data } = await getAllCode(filter)
    if (code == 10200) {
      setCodeList(data)
      setLoading(false)
    }
  }
  useEffect(() => {
    getCodeList()
  }, [])
  return (
    <HomeWrapper>
      {' '}
      <div className="home-container">
        <Layout hasSider>
          <Content style={contentStyle}>
            {codeList.map((item: any) => {
              return (
                <ItemCard
                  key={item.id}
                  title={item.name}
                  description={item.description}
                  loading={loading}
                >
                  <CodeBlock
                    name={item.name}
                    code={item.content}
                    language={item.language}
                    id={item.id}
                  ></CodeBlock>
                </ItemCard>
              )
            })}
            <Pagination
              style={{ display: loading ? 'none' : 'block' }}
              defaultCurrent={1}
              total={50}
            />
          </Content>
          <Sider theme="light" style={siderStyle} width={'25%'}>
            Sider
          </Sider>
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
