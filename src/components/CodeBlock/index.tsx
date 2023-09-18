import React, { useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import * as htmlToImage from 'html-to-image'
import hljs from '@/utils/highlight'
import Clipboard from 'clipboard'

import { Button, Card, Select, Image, Space } from 'antd'
import {
  DownloadOutlined,
  EditOutlined,
  PictureOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined
} from '@ant-design/icons'
import { FilterFunc } from 'rc-select/lib/Select'

import { CodeBlockWrapper } from './style'
import { useAppDispatch } from '@/store'
import {
  changeEditCode,
  changeEditorDisplayAction
} from '@/store/modules/system'

interface IProps {
  children?: ReactNode
  code: string
  language: string
  id: string // 代码id
  width?: number
  name: string
}

/**
 * 代码块配置项
 */
const codeOpts = {
  languageOpts: [
    { value: '', label: 'Auto' },
    {
      value: 'java',
      label: 'Java'
    },
    {
      value: 'javascript',
      label: 'Javascript'
    },
    {
      value: 'cpp',
      label: 'Cpp'
    },
    {
      value: 'bash',
      label: 'Bash'
    }
  ],
  themeOpts: [
    {
      value: 'default',
      label: 'Default'
    },
    {
      value: 'github',
      label: 'Github'
    }
  ]
}

// Select 组件的过滤器
const filterOption = ((
  input: string,
  option: { label: string; value: string }
) => {
  return (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
}) as FilterFunc<{ value: string; label: string }>

// 缓存已加载过的主题
const themeMap = new Map()

const CodeBlock: FC<IProps> = ({
  code,
  language,
  width = '100%',
  id,
  name
}) => {
  const dispatch = useAppDispatch()
  const [theme, setTheme] = useState('github')
  const [imgUrl, setImgUrl] = useState('')

  const [previewVisible, setPreviewVisible] = useState(false)

  // 动态加载主题样式文件
  useEffect(() => {
    const loadTheme = async () => {
      const themeFileName = `${theme}.css`
      try {
        // 移除上一次导入的样式内容
        const preStyleTags = document.head.getElementsByTagName('style')
        const preLastStyleTag = preStyleTags[preStyleTags.length - 1]
        // console.log(lastStyleTag.textContent)
        if (preLastStyleTag.textContent?.includes('code.hljs')) {
          preLastStyleTag.textContent = ''
          // console.log('removed!')
        }
        // 判断是否导入过该主题，若已导入则直接从 map 中拿取缓存的数据
        if (themeMap.has(theme)) {
          // console.log('have', themeMap.get(theme))
          preLastStyleTag.textContent = themeMap.get(theme)
        } else {
          // 使用动态导入加载样式文件
          await import(
            `../../../node_modules/highlight.js/styles/${themeFileName}`
          )
        }
        // 导入样式文件后会在 head 末尾生成一个新的 style 标签，所以需要重新获取
        const curStyleTags = document.head.getElementsByTagName('style')
        const curLastStyleTag = curStyleTags[curStyleTags.length - 1]
        // 缓存导入的样式文件中的内容
        if (curLastStyleTag.textContent?.includes('code')) {
          themeMap.set(theme, curLastStyleTag.textContent)
          // console.log('con', curLastStyleTag.textContent)
        }

        // console.log('theme loaded！', themeMap)
      } catch (error) {
        console.error(`Error loading theme '${theme}':`, error)
      }
    }

    loadTheme()
  }, [theme])

  // 将代码块转换为图片
  const handleConvertToImage = () => {
    const codeContainer = document.querySelector(
      `.code-content-${id}`
    ) as HTMLElement

    htmlToImage
      .toPng(codeContainer)
      .then(function (dataUrl) {
        setImgUrl(dataUrl)
        setPreviewVisible(true)
      })
      .catch(function (error: Error) {
        console.error('Error converting code to image:', error)
      })
  }
  /**
   * 下载图片
   */
  const onDownload = () => {
    fetch(imgUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]))
        const link = document.createElement('a')
        link.href = url
        link.download = `${name}(${language}).png`
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(url)
        link.remove()
      })
  }
  // 编辑代码
  const handleEdit = () => {
    dispatch(changeEditorDisplayAction(true))
    dispatch(changeEditCode({ editCode: code }))
  }
  // 对代码进行复制
  const [copy, setCopy] = useState(false)
  const preRef = useRef(null)
  useEffect(() => {
    // console.log('pre', preRef.current)
    if (preRef.current) {
      hljs.highlightElement(preRef.current)
      setCopy(true)
      // 创建 clipboard 实例并保存到变量中
      const clipboard = new Clipboard(`#${language}-${id}copy_btn`, {
        text: () => code
      })

      // 监听复制成功事件
      clipboard.on('success', () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })

      // 销毁 clipboard 实例
      return () => {
        clipboard.destroy()
      }
    }
  }, [preRef.current])
  const [copied, setCopied] = useState(false)

  return (
    <div>
      {/* 代码块卡片 */}
      <CodeBlockWrapper>
        {' '}
        <div id="code-container" style={{ width: width }}>
          <Card>
            <div
              className="code-block"
              style={{ position: 'relative', marginTop: 8 }}
            >
              <div className="code-options">
                {/* 语言选项 */}
                {/* <Select
                  value={language}
                  showSearch
                  style={{ width: 120 }}
                  options={codeOpts.languageOpts}
                  onChange={(value) => setLanguage(value)}
                  filterOption={filterOption}
                /> */}
                {/* 主题选项 */}
                <Select
                  value={theme}
                  showSearch
                  style={{ width: 120 }}
                  options={codeOpts.themeOpts}
                  onChange={(value) => setTheme(value)}
                  filterOption={filterOption}
                />
              </div>

              <div className={`code-content-${id}`}>
                <pre>
                  <code
                    id={`${language}-${id}`}
                    ref={preRef}
                    className={`hljs language-${language} theme-${theme}`}
                  >
                    {code}
                  </code>
                </pre>
                <div
                  className="code-lang"
                  style={{
                    display: 'inline',
                    position: 'absolute',
                    top: '1.6em',
                    right: '0.1em',
                    lineHeight: '14px',
                    color: '#b9b9b9',
                    fontSize: '0.5em'
                  }}
                >
                  {language.toUpperCase()}
                </div>
              </div>
              <Image
                style={{ display: 'none' }}
                src={imgUrl}
                preview={{
                  visible: previewVisible,
                  src: imgUrl,
                  onVisibleChange: (value) => {
                    setPreviewVisible(value)
                  },
                  toolbarRender: (
                    _,
                    {
                      transform: { scale },
                      actions: {
                        onFlipY,
                        onFlipX,
                        onRotateLeft,
                        onRotateRight,
                        onZoomOut,
                        onZoomIn
                      }
                    }
                  ) => (
                    <Space size={30} className="toolbar-wrapper">
                      <DownloadOutlined onClick={onDownload} />
                      <SwapOutlined rotate={90} onClick={onFlipY} />
                      <SwapOutlined onClick={onFlipX} />
                      <RotateLeftOutlined onClick={onRotateLeft} />
                      <RotateRightOutlined onClick={onRotateRight} />
                      <ZoomOutOutlined
                        disabled={scale === 1}
                        onClick={onZoomOut}
                      />
                      <ZoomInOutlined
                        disabled={scale === 50}
                        onClick={onZoomIn}
                      />
                    </Space>
                  )
                }}
              />
              <div className="handle">
                <Button
                  id={`${language}-${id}copy_btn`}
                  type="link"
                  className="code-block__button"
                  data-clipboard-target={`#${language}-${id}`}
                  disabled={!copy}
                >
                  {copied ? '已复制' : '复制'}
                </Button>
                <Button
                  type="link"
                  icon={<PictureOutlined />}
                  onClick={handleConvertToImage}
                ></Button>
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                ></Button>
              </div>
            </div>
          </Card>
        </div>
      </CodeBlockWrapper>
    </div>
  )
}

export default CodeBlock
