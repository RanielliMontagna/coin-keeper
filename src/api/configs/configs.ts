import { urls } from 'api/urls'
import { axiosInstance } from 'libs/axios'

import type { BackendResponse } from 'shared/types'
import type { Configs, UpdateConfigsPayload } from './config.types'

export async function fetchConfigs(): BackendResponse<Configs> {
  return await axiosInstance.get(urls.configs)
}

export async function updateConfigs(data: UpdateConfigsPayload): BackendResponse<{
  updatedCount: number
}> {
  return await axiosInstance.put(urls.configs, data)
}
