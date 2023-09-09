import React, { Suspense, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import Navigator from './components/Header/Navigator'
// import Footer from './components/footer'
import { useAppDispatch } from './store'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // 在组件加载后执行一次
  }, [])

  return (
    <div className="App">
      <Navigator></Navigator>
      {/* 懒加载组件的包裹 */}
      <Suspense fallback="isLoading...">
        {/* 路由渲染的主要内容 */}
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
      {/* <Footer></Footer> */}
    </div>
  )
}

export default App
