import type { CreateTransactionPayload, ResponseTransactions } from './transactions.types'

import { urls } from 'api/urls'
import { AxiosResponse } from 'axios'
import { axiosInstance } from 'libs/axios'
import { Options } from 'shared/options'

export async function fetchTransactions(
  options?: Options,
): Promise<AxiosResponse<ResponseTransactions[]>> {
  return await axiosInstance.get(urls.transactions, { params: options })
}

export async function createTransaction(payload: CreateTransactionPayload) {
  return await axiosInstance.post(urls.transactions, payload)
}

export async function deleteTransaction(id: string) {
  return await axiosInstance.delete(`${urls.transactions}/${id}`)
}
