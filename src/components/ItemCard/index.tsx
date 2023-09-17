import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import Card from 'antd/es/card/Card'
import { CardWrapper } from './style'
import { HeartOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { Avatar, Skeleton } from 'antd'
import Meta from 'antd/es/card/Meta'

interface IProps {
  children?: ReactNode
  width?: number | string
  avatar?: string
  title: string
  description: string
  loading?: boolean
}

const ItemCard: FC<IProps> = (props) => {
  return (
    <CardWrapper>
      {' '}
      <Card
        style={{ width: props.width }}
        loading={props.loading}
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
        <Skeleton loading={props.loading} avatar active></Skeleton>
      </Card>
    </CardWrapper>
  )
}

export default memo(ItemCard)
