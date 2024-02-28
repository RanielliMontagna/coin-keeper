/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

interface AxiosResponseWithMeta<T> extends AxiosResponse<T> {
  meta?: any
}

declare module 'axios' {
  export interface AxiosInstance {
    get<T = any, R = AxiosResponse<T>>(
      url: string,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponseWithMeta<T>>
  }
}
