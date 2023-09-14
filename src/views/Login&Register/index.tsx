import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import CommonForm from '@/components/FormComp'
import { Button, Checkbox, Form, Input, Card, message, Tabs } from 'antd'
import { UserWrapper } from './style'
import { userLogin, userRegister } from '@/api/user'
import { useAppDispatch } from '@/store'
import { changeMessageAction } from '@/store/modules/system'

type FieldType = {
  username?: string
  password?: string
  remember?: string
  email?: string
}

interface IProps {
  children?: ReactNode
}

const LoginRegister: FC<IProps> = () => {
  const dispatch = useAppDispatch()

  const register = async (values: any) => {
    console.log('Success:', values)
    const res = await userRegister(values)
    if (res.message) {
      dispatch(changeMessageAction(res.message))
      console.log(res.message)
    }
  }
  const login = async (values: any) => {
    console.log('Success:', values)
    const res = await userLogin(values)
    if (res.message) {
      dispatch(changeMessageAction(res.message))
      console.log(res.message)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <UserWrapper>
      <div className="form-container">
        <Card>
          <Tabs
            defaultActiveKey="2"
            centered
            items={[
              {
                label: '注册',
                key: '1',
                children: (
                  <CommonForm>
                    <Form
                      name="basic"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                      style={{ maxWidth: 600 }}
                      initialValues={{ remember: true }}
                      onFinish={register}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      <Form.Item<FieldType>
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item<FieldType>
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                      >
                        <Input.Password />
                      </Form.Item>
                      <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: '请输入邮箱!' }]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                      >
                        <Checkbox>记住我</Checkbox>
                      </Form.Item>

                      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                          注册
                        </Button>
                      </Form.Item>
                    </Form>
                  </CommonForm>
                )
              },
              {
                label: '登录',
                key: '2',
                children: (
                  <CommonForm>
                    <Form
                      name="basic"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                      style={{ maxWidth: 600 }}
                      initialValues={{ remember: true }}
                      onFinish={login}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      <Form.Item<FieldType>
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item<FieldType>
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                      >
                        <Input.Password />
                      </Form.Item>

                      <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                      >
                        <Checkbox>记住我</Checkbox>
                      </Form.Item>

                      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                          登录
                        </Button>
                      </Form.Item>
                    </Form>
                  </CommonForm>
                )
              }
            ]}
          />
        </Card>
      </div>
    </UserWrapper>
  )
}

export default memo(LoginRegister)
