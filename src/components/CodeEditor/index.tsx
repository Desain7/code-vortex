import React, { memo, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import { Card } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import Draggable from 'react-draggable'
// 引入
import CodeMirror from '@uiw/react-codemirror'
// 配置项
// import 'codemirror/keymap/sublime'
// import 'codemirror/addon/display/autorefresh'
// import 'codemirror/addon/comment/comment'
// import 'codemirror/addon/edit/matchbrackets'

import { javascript } from '@codemirror/lang-javascript'
// 引入样式
import '@uiw/codemirror-theme-github'
import { EditorWrapper } from './style'
interface IProps {
  children?: ReactNode
}

/**
 * Todo
 * 1. 全局只会维护一个代码编辑器的实例，每段编辑的代码都会在本地生成一个临时存储，防止丢失
 * 2. 用户可以选择编辑器的语言和主题
 * 3. 代码编辑器可拖拽
 * 4. 代码编辑器支持两种大小，用户可以进行切换
 *
 */
const options = {
  // mode: 'javascript', //实现代码高亮
  keyMap: 'sublime', // 配置快捷键
  lineWrapping: true, // 自动换行
  matchBrackets: true, //括号匹配
  readOnly: true, //只读
  indentUnit: 2, // 缩进空格数,默认2
  smartIndent: true, //自动缩进 默认true
  tabSize: 4 // tab字符宽度，默认4
  //... 具体可以参考文档
}

const snippet = `123`

const CodeEditor: FC<IProps> = () => {
  const onChange = React.useCallback((value: any, viewUpdate: any) => {
    console.log('value:', value)
  }, [])
  return (
    <Draggable handle=".ant-card-head">
      <EditorWrapper>
        <Card
          title="代码编辑"
          bordered={true}
          style={{ width: 300, padding: '0' }}
          actions={[<div key={'save'}>保存</div>]}
          extra={
            <CloseOutlined
              style={{ fontSize: '100%', color: '#9a9a9a', cursor: 'pointer' }}
            />
          }
        >
          <CodeMirror
            value="console.log('hello world!');"
            height="200px"
            extensions={[javascript({ jsx: true })]}
            onChange={onChange}
          />
        </Card>
      </EditorWrapper>
    </Draggable>
  )
}

export default memo(CodeEditor)
