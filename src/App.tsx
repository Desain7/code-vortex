import React, { Suspense, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import Navigator from './components/Header/Navigator'
// import Footer from './components/footer'
import { useAppDispatch, useAppSelector } from './store'
import { LoadingOutlined } from '@ant-design/icons'
import { FloatButton, message } from 'antd'
import { shallowEqual, useSelector } from 'react-redux'
import { getToken } from './utils/userConfig'
import { fetchUserConfigAction } from './store/modules/user'

function App() {
  const dispatch = useAppDispatch()
  const { getMessage } = useAppSelector(
    (state) => ({
      getMessage: state.system.message
    }),
    shallowEqual
  )

  useEffect(() => {
    // 监听到了 message 的变化后，发送
    if (getMessage.text) {
      message[getMessage.type](getMessage.text)
      console.log('message', getMessage)
    }
  }, [getMessage])
  getToken()

  useEffect(() => {
    dispatch(fetchUserConfigAction())
  }, [])

  return (
    <div className="App">
      <Navigator></Navigator>
      {/* 懒加载组件的包裹 */}
      <Suspense
        fallback={
          <LoadingOutlined
            style={{
              fontSize: 40,
              position: 'absolute',
              top: '50%',
              left: '50%'
            }}
            spin
          />
        }
      >
        {/* 路由渲染的主要内容 */}
        <div className="main">{useRoutes(routes)}</div>
        <FloatButton.BackTop />
      </Suspense>
      {/* <Footer></Footer> */}
    </div>
  )
}

export default App
