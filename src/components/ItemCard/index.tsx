import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const ItemCard: FC<IProps> = () => {
  return <div>ItemCard</div>
}

export default memo(ItemCard)
