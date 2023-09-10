import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import Card from 'antd/es/card/Card'
import { CardWrapper } from './style'

interface IProps {
  children?: ReactNode
  width?: number | string
}

const ItemCard: FC<IProps> = (props) => {
  return (
    <CardWrapper>
      {' '}
      <Card style={{ width: props.width }}>{props.children}</Card>
    </CardWrapper>
  )
}

export default memo(ItemCard)
