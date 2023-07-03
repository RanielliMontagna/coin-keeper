import type { CreateTransactionPayload, ResponseTransaction } from './transactions.types'

import { urls } from 'api/urls'
import { AxiosResponse } from 'axios'
import { axiosInstance } from 'libs/axios'
import { Options } from 'shared/options'

export async function fetchTransactions(
  options?: Options,
): Promise<AxiosResponse<ResponseTransaction[]>> {
  return await axiosInstance.get(urls.transactions, { params: options })
}

export async function latestTransactions(): Promise<AxiosResponse<ResponseTransaction[]>> {
  return await axiosInstance.get(`${urls.transactions}/latest`)
}

export async function createTransaction(payload: CreateTransactionPayload) {
  return await axiosInstance.post(urls.transactions, payload)
}

export async function deleteTransaction(id: string) {
  return await axiosInstance.delete(`${urls.transactions}/${id}`)
}
