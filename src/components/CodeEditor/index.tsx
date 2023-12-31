import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Alert, Card, Select } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
// 引入
import CodeMirror from '@uiw/react-codemirror'
// 配置项
// import 'codemirror/keymap/sublime'
// import 'codemirror/addon/display/autorefresh'
// import 'codemirror/addon/comment/comment'
// import 'codemirror/addon/edit/matchbrackets'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { transform } from '@babel/standalone'

import { javascript } from '@codemirror/lang-javascript'
// 引入样式
import '@uiw/codemirror-theme-github'
import { EditorWrapper } from './style'
import { addCode } from '@/api/code'
import { useAppDispatch, useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import { FilterFunc } from 'rc-select/lib/Select'
import {
  changeEditCode,
  changeEditorDisplayAction,
  changeMessageAction
} from '@/store/modules/system'
interface IProps {
  children?: ReactNode
  show: boolean
  editCode?: string
}

/**
 * Todo
 * 1. 全局只会维护一个代码编辑器的实例，每段编辑的代码都会在本地生成一个临时存储，防止丢失
 * 2. 用户可以选择编辑器的语言和主题
 * 3. 代码编辑器可拖拽
 * 4. 代码编辑器支持两种大小，用户可以进行切换
 * 5. 代码支持本地、云端存储
 */

const languageOpts = [
  { value: 'javascript', label: 'Javascript' },
  { value: 'cpp', label: 'Cpp' },
  { value: 'java', label: 'Java' },
  { value: 'python', label: 'Python' }
]
// Select 组件的过滤器
const filterOption = ((
  input: string,
  option: { label: string; value: string }
) => {
  return (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
}) as FilterFunc<{ value: string; label: string }>

const CodeEditor: FC<IProps> = ({ show }) => {
  const { editCode } = useAppSelector(
    (state) => ({
      editCode: state.system.editCode
    }),
    shallowEqual
  )
  const dispatch = useAppDispatch()
  // 代码内容
  const [code, setCode] = useState('')
  // 输出内容
  const [output, setOutput] = useState('')
  // 代码语言
  const [language, setLanguage] = useState('javascript')
  const onLangChange = (value: string) => {
    setLanguage(value)
  }

  // 当要对代码进行编辑时，改变 code
  useEffect(() => {
    setCode(editCode)
  }, [editCode])
  /**
   * 运行代码
   */
  const runCode = () => {
    try {
      const compliedCode = transform(code, { presets: ['env'] }).code
      const result = eval(compliedCode)
      console.log('result', result, code)
      setOutput(result)
    } catch (error) {
      setOutput(`Error: ${error}`)
    }
  }
  const { userConfig, login } = useAppSelector(
    (state) => ({
      userConfig: state.user.userConfig,
      login: state.user.login
    }),
    shallowEqual
  )

  /**
   * 新增代码片段
   */
  const addUserCode = async () => {
    const res = await addCode({
      code,
      language,
      name: 'test',
      user: userConfig.id as string
    })
    if (res.code == 10200) {
      dispatch(changeMessageAction({ text: '发布成功', type: 'success' }))
      setCode('')
    }
  }
  /**
   * 保存代码片段
   */
  const saveUserCode = async () => {
    const res = await addCode({
      code,
      language,
      name: 'test',
      user: userConfig.id as string
    })
    if (res.code == 10200) {
      dispatch(changeMessageAction({ text: '保存成功', type: 'success' }))
    }
  }

  /**
   * 将编辑中的代码片段缓存到本地
   * @param code 代码片段
   */
  const localCache = (code: string) => {
    localStorage.setItem('codeCache', code)
  }
  const [visible, setVisible] = useState(false)
  /**
   * 获取本地缓存的代码
   */
  const getCache = () => {
    const code = localStorage.getItem('codeCache')
    if (code) {
      setCode(code)
      setVisible(true)
      setTimeout(() => {
        setVisible(false)
      }, 2000)
    }
  }

  useEffect(() => {
    getCache()
  }, [])
  /**
   * 代码改变后调用函数
   */
  const onCodeChange = React.useCallback((value: any, viewUpdate: any) => {
    setCode(value)
    localCache(value)
  }, [])
  return (
    <EditorWrapper>
      <Card
        bordered={false}
        style={{
          padding: '0',
          cursor: 'text',
          display: show ? 'block' : 'none'
        }}
        actions={[
          <div key={'lang'}>
            {' '}
            <Select
              value={language}
              showSearch
              style={{ width: 120 }}
              options={languageOpts}
              onChange={(value) => onLangChange(value)}
              filterOption={filterOption}
            />
          </div>,
          <div key={'save'} onClick={editCode ? saveUserCode : addUserCode}>
            {editCode ? '保存' : '发布'}
          </div>
          // <div key={'run'} onClick={runCode}>
          //   运行
          // </div>
        ]}
      >
        <CodeMirror
          value={code}
          height="75vh"
          extensions={[javascript({ jsx: true })]}
          onChange={onCodeChange}
        />
        {visible && (
          <Alert message="已恢复上一次编辑的代码" type="info" closable />
        )}

        <div>{output}</div>
      </Card>
    </EditorWrapper>
  )
}

export default memo(CodeEditor)
