import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const AlertComp: FC<IProps> = () => {
  return <div>AlertComp</div>
}

export default memo(AlertComp)
