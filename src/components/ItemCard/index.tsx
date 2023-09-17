import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import Card from 'antd/es/card/Card'
import { CardWrapper } from './style'
import { HeartOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import Meta from 'antd/es/card/Meta'

interface IProps {
  children?: ReactNode
  width?: number | string
  avatar?: string
  title: string
  description: string
}

const ItemCard: FC<IProps> = (props) => {
  return (
    <CardWrapper>
      {' '}
      <Card
        style={{ width: props.width }}
        actions={[
          <LikeOutlined key="like" />,
          <MessageOutlined key="comment" />,
          <HeartOutlined key="collect" />
        ]}
      >
        <Meta
          avatar={
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
          }
          title={props.title}
          description={props.description}
        />
        {props.children}
      </Card>
    </CardWrapper>
  )
}

export default memo(ItemCard)
