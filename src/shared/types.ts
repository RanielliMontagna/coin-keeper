import { AxiosResponse } from 'axios'

interface AxiosResponseWithMeta<T> extends AxiosResponse<T> {
  meta?: any
}

export type BackendResponse<T> = Promise<AxiosResponseWithMeta<T>>
