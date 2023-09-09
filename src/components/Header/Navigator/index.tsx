import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { HeaderLeft, HeaderRight, HeaderWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const navItems = [
  {
    title: '首页',
    type: 'path',
    link: '/home'
  },
  {
    title: '代码库',
    type: 'path',
    link: '/codeLib'
  },
  {
    title: '聊天助手',
    type: 'path',
    link: '/chat'
  }
]

const Navigator: FC<IProps> = () => {
  /** 定义组件内部的状态 */
  // const [currentIndex, setCurrentIndex] = useState(0)

  /** 组件的展示逻辑 */
  function showItem(item: any) {
    if (item.type === 'path') {
      return (
        <NavLink
          to={item.link}
          className={({ isActive }) => {
            return isActive ? 'active' : undefined
          }}
        >
          {item.title}
          <i className="icon sprite_01"></i>
        </NavLink>
      )
    } else {
      return (
        <a href={item.link} rel="noreferrer" target="_blank">
          {item.title}
        </a>
      )
    }
  }

  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          <a className="logo" href="/">
            CodeVortex
          </a>
          <div className="title-list">
            {navItems.map((item: any) => {
              return (
                <div className="item" key={item.title}>
                  {showItem(item)}
                </div>
              )
            })}
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Input
            className="search"
            placeholder=""
            prefix={<SearchOutlined />}
          />
          <span className="login">登录</span>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  )
}

export default memo(Navigator)
