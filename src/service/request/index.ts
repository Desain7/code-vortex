// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MyRequestConfig } from './type'

import NProgress from 'nprogress' // 导入 nprogress模块

import 'nprogress/nprogress.css' // 导入样式，否则看不到效果

NProgress.configure({ showSpinner: false }) // 显示右上角螺旋加载提示

// 拦截器: 蒙版Loading/token/修改配置

/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型)
 */

class MyRequest {
  instance: AxiosInstance

  // request实例 => axios的实例
  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config)

    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 展示 loading 进度条
        NProgress.start()
        const token =
          localStorage.getItem('codevortex-token') ||
          sessionStorage.getItem('codevortex-token')
        config.headers.Authorization = token
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 隐藏
        NProgress.done()
        return res.data
      },
      (err) => {
        NProgress.done()
        return err
      }
    )

    // 针对特定的Request实例添加拦截器
    // this.instance.interceptors.request.use(
    //   config.interceptors?.requestSuccessFn,
    //   config.interceptors?.requestFailureFn
    // )
    // this.instance.interceptors.response.use(
    //   config.interceptors?.responseSuccessFn,
    //   config.interceptors?.responseFailureFn
    // )
  }

  // 封装网络请求的方法
  // T => IHomeData
  request<T = any>(config: MyRequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单词响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default MyRequest
