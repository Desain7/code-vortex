import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import CodeEditor from '@/components/CodeEditor'

interface IProps {
  children?: ReactNode
}

const CodeLib: FC<IProps> = () => {
  return (
    <div>
      <CodeEditor></CodeEditor>
    </div>
  )
}

export default memo(CodeLib)
