import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { FormWrapper } from './style'

interface IProps {
  children: ReactNode
  title?: string
  button?: ReactNode
}

/**
 *
 * @returns 通用表单组件
 */
const CommonForm: FC<IProps> = ({ children, title, button }) => {
  return (
    <FormWrapper>
      <div className="form-container">
        <div className="form-content">{children}</div>
      </div>
    </FormWrapper>
  )
}

export default memo(CommonForm)
