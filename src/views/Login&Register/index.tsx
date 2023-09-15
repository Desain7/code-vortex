import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import CommonForm from '@/components/FormComp'
import { Button, Checkbox, Form, Input, Card, Tabs } from 'antd'
import { UserWrapper } from './style'
import { userLogin, userRegister } from '@/api/user'
import { useAppDispatch } from '@/store'
import { changeMessageAction } from '@/store/modules/system'
import { changeUserConfigAction, userLoginAction } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'
type FieldType = {
  username?: string
  password?: string
  remember?: string // remember 为 true 时，使用 local Storage，为 false 时，使用 sessionStorage
  email?: string
}

interface IProps {
  children?: ReactNode
}

const LoginRegister: FC<IProps> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState('2')

  const register = async (values: any) => {
    const res = await userRegister(values)
    if (res.message) {
      dispatch(changeMessageAction(res.message))
      console.log(res.message)
    }
    if (res.code === 10200) {
      dispatch(changeMessageAction({ text: '注册成功', type: 'success' }))
      setActiveTab('2')
    }
  }

  const login = async (values: any) => {
    const res = await userLogin(values)
    if (res.message) {
      dispatch(changeMessageAction({ text: res.message }))
      console.log(res.message)
    }
    if (res.code === 10200) {
      console.log(123123)
      const { user, token } = res.data
      dispatch(changeMessageAction({ text: '登陆成功', type: 'success' }))
      dispatch(changeUserConfigAction(user))
      dispatch(
        userLoginAction({
          token: token,
          remember: values.remember
        })
      )
      navigate('/home', { replace: true })
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
            activeKey={activeTab}
            centered
            onTabClick={(key) => setActiveTab(key)}
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
