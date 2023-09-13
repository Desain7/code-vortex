import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import CommonForm from '@/components/FormComp'
import { Button, Checkbox, Form, Input, Card, message } from 'antd'
import { UserWrapper } from './style'
import { userRegister } from '@/api/user'
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

  const onFinish = async (values: any) => {
    console.log('Success:', values)
    const res = await userRegister(values)
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
          <CommonForm>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[
                  { required: true, message: 'Please input your username!' }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' }
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please input your Email!' }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </CommonForm>
        </Card>
      </div>
    </UserWrapper>
  )
}

export default memo(LoginRegister)
