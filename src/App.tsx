import React, { Suspense, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import Navigator from './components/Header/Navigator'
// import Footer from './components/footer'
import { useAppDispatch, useAppSelector } from './store'
import {
  CodeOutlined,
  LoadingOutlined,
  RocketOutlined,
  SendOutlined
} from '@ant-design/icons'
import { Drawer, FloatButton, message } from 'antd'
import { shallowEqual, useSelector } from 'react-redux'
import { getToken } from './utils/userConfig'
import { fetchUserConfigAction } from './store/modules/user'
import CodeEditor from './components/CodeEditor'
import {
  changeEditorDisplayAction,
  changeEditCode
} from './store/modules/system'

function App() {
  const dispatch = useAppDispatch()
  const { getMessage, showEditor } = useAppSelector(
    (state) => ({
      getMessage: state.system.message,
      showEditor: state.system.showEditor
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
  // 关闭编辑器
  const closeEditor = () => {
    dispatch(changeEditorDisplayAction(false))
    dispatch(changeEditCode(''))
  }

  const openEditor = () => {
    dispatch(changeEditorDisplayAction(true))
  }

  return (
    <div className="App">
      <Navigator></Navigator>
      {/* 全局代码编辑器组件 */}
      <Drawer
        title="代码编辑"
        placement="right"
        size="large"
        onClose={closeEditor}
        open={showEditor}
      >
        <CodeEditor show={showEditor}></CodeEditor>
      </Drawer>
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
        <FloatButton.Group
          trigger="click"
          type="primary"
          style={{ right: 24 }}
          icon={<CodeOutlined />}
        >
          <FloatButton icon={<SendOutlined />} onClick={openEditor} />
          <FloatButton.BackTop icon={<RocketOutlined />} />
        </FloatButton.Group>
      </Suspense>
      {/* <Footer></Footer> */}
    </div>
  )
}

export default App
