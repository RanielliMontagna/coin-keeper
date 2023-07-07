import { AxiosResponse } from 'axios'

export type BackendResponse<T> = Promise<AxiosResponse<{ data: T }>>
