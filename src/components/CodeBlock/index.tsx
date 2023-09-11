import React, { useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import * as htmlToImage from 'html-to-image'
import hljs from '@/utils/highlight'
import Clipboard from 'clipboard'

import { Button, Card, Select } from 'antd'
import { PictureOutlined } from '@ant-design/icons'
import { FilterFunc } from 'rc-select/lib/Select'

interface IProps {
  children?: ReactNode
  code: string
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

const themeMap = new Map()

const CodeBlock: FC<IProps> = ({ code }) => {
  const [language, setLanguage] = useState('')
  const [theme, setTheme] = useState('github')

  // 监听 language 内容的变化，更新 clipboard 实例
  useEffect(() => {
    if (preRef.current) {
      hljs.highlightElement(preRef.current)

      // 创建 clipboard 实例并保存到变量中
      const clipboard = new Clipboard(`#${language}copy_btn`, {
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
  }, [language])

  // 动态加载主题样式文件
  useEffect(() => {
    const loadTheme = async () => {
      const themeFileName = `${theme}.css`
      try {
        // 移除上一次添加的样式
        const preStyleTags = document.head.getElementsByTagName('style')
        const preLastStyleTag = preStyleTags[preStyleTags.length - 1]
        // console.log(lastStyleTag.textContent)
        if (preLastStyleTag.textContent?.includes('code')) {
          preLastStyleTag.textContent = ''
          console.log('removed!')
        }
        if (themeMap.has(theme)) {
          console.log('have', themeMap.get(theme))
          preLastStyleTag.textContent = themeMap.get(theme)
        } else {
          await import(
            `../../../node_modules/highlight.js/styles/${themeFileName}`
          )
        }
        // 使用动态导入加载样式文件
        const curStyleTags = document.head.getElementsByTagName('style')
        const curLastStyleTag = curStyleTags[curStyleTags.length - 1]
        if (curLastStyleTag.textContent?.includes('code')) {
          themeMap.set(theme, curLastStyleTag.textContent)
          console.log('con', curLastStyleTag.textContent)
        }

        console.log('theme loaded！', themeMap)
      } catch (error) {
        console.error(`Error loading theme '${theme}':`, error)
      }
    }

    loadTheme()
  }, [theme])

  // Select 组件的过滤器
  const filterOption = ((
    input: string,
    option: { label: string; value: string }
  ) => {
    return (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
  }) as FilterFunc<{ value: string; label: string }>

  // 将代码块转换为图片
  const handleConvertToImage = () => {
    const codeContainer = document.querySelector('.code-content') as HTMLElement

    htmlToImage
      .toPng(codeContainer)
      .then(function (dataUrl) {
        const img = new Image()
        img.src = dataUrl
        document.body.appendChild(img)
      })
      .catch(function (error: Error) {
        console.error('Error converting code to image:', error)
      })
  }

  const preRef = useRef(null)
  const [copied, setCopied] = useState(false)

  return (
    <div>
      {/* 代码块卡片 */}
      <div id="code-container">
        <Card>
          <div
            className="code-block"
            style={{ position: 'relative', marginTop: 8 }}
          >
            <div className="code-options">
              <Select
                value={language}
                showSearch
                style={{ width: 120 }}
                options={codeOpts.languageOpts}
                onChange={(value) => setLanguage(value)}
                filterOption={filterOption}
              />
              <Select
                value={theme}
                showSearch
                style={{ width: 120 }}
                options={codeOpts.themeOpts}
                onChange={(value) => setTheme(value)}
                filterOption={filterOption}
              />
            </div>

            <div className="code-content">
              <pre>
                <code
                  id={language}
                  ref={preRef}
                  className={`hljs language-${language} theme-${theme}`}
                >
                  {code}
                </code>
              </pre>
            </div>

            <Button
              id={`${language}copy_btn`}
              style={{
                position: 'absolute',
                top: 4,
                right: 4,
                lineHeight: '14px'
              }}
              type="link"
              className="code-block__button"
              data-clipboard-target={`#${language}`}
              disabled={!preRef.current}
            >
              {copied ? '已复制' : '复制'}
            </Button>
            <div className="handle"></div>
            <Button
              icon={<PictureOutlined />}
              onClick={handleConvertToImage}
            ></Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default CodeBlock
