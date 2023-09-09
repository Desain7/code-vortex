import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Chat: FC<IProps> = () => {
  return <div>Chat</div>
}

export default memo(Chat)
