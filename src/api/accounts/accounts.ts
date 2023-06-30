import type { CreateAccountPayload, ResponseAccount } from './accounts.types'

import { urls } from 'api/urls'
import { AxiosResponse } from 'axios'
import { axiosInstance } from 'libs/axios'
import { Options } from 'shared/options'

export async function fetchAccounts(options?: Options): Promise<AxiosResponse<ResponseAccount[]>> {
  return await axiosInstance.get(urls.accounts, { params: options })
}

export async function getAccount(id: string) {
  return await axiosInstance.get(`${urls.accounts}/${id}`)
}

export async function createAccount(payload: CreateAccountPayload) {
  return await axiosInstance.post(urls.accounts, payload)
}

export async function updateAccount(id: string, payload: CreateAccountPayload) {
  return await axiosInstance.put(`${urls.accounts}/${id}`, payload)
}

export async function deleteAccount(id: string) {
  return await axiosInstance.delete(`${urls.accounts}/${id}`)
}
