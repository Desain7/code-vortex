import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import 'normalize.css'
import './assets/css/index.less'

import store from './store'
import { theme, antdTheme } from './assets/theme'
import App from '@/App'
import { ConfigProvider } from 'antd'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // Redux 提供全局状态
  <Provider store={store}>
    <ConfigProvider
      theme={{
        // 全局 token
        token: {
          colorPrimary: '#84adea'
        },
        // 组件 token
        components: {
          Tabs: {
            inkBarColor: '#cbdcf7'
          }
        }
      }}
    >
      {/* 全局主题 */}
      <ThemeProvider theme={theme}>
        <HashRouter>
          <App />
        </HashRouter>
      </ThemeProvider>
    </ConfigProvider>
  </Provider>
)
