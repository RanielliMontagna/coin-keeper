import type {
  CreateTransactionPayload,
  ResponseBalance,
  ResponseTransaction,
} from './transactions.types'
import type { BackendResponse } from 'shared/types'

import { urls } from 'api/urls'
import { axiosInstance } from 'libs/axios'
import { Options } from 'shared/options'

export async function fetchTransactions(
  options?: Pick<Options, 'page'>,
): BackendResponse<{ transactions: ResponseTransaction[] }> {
  return await axiosInstance.get(urls.transactions, { params: options })
}

export async function latestTransactions(): BackendResponse<{
  transactions: ResponseTransaction[]
}> {
  return await axiosInstance.get(`${urls.transactions}/latest`)
}

export async function getTransactionsBalance(): BackendResponse<ResponseBalance> {
  return await axiosInstance.get(`${urls.transactions}/balance`)
}

export async function createTransaction(payload: CreateTransactionPayload) {
  return await axiosInstance.post(urls.transactions, payload)
}

export async function deleteTransaction(id: string) {
  return await axiosInstance.delete(`${urls.transactions}/${id}`)
}

export async function getTransactionGraphicsWeek() {
  return await axiosInstance.get(`${urls.transactions}/graphics/week`)
}

export async function getTransactionGraphicsMonth() {
  return await axiosInstance.get(`${urls.transactions}/graphics/month`)
}

export async function getTransactionGraphicsYear() {
  return await axiosInstance.get(`${urls.transactions}/graphics/year`)
}
