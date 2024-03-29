import type {
  CreateTransactionPayload,
  ResponseBalance,
  ResponseMarkAsPaid,
  ResponseTransaction,
} from './transactions.types'
import type { BackendResponse } from 'shared/types'

import { urls } from 'api/urls'
import { axiosInstance } from 'libs/axios'
import { Options } from 'shared/options'
import { centsToReal } from 'utils/centsToReal'
import { realToCents } from 'utils/realToCents'

function treatTransaction(transaction: ResponseTransaction) {
  return {
    ...transaction,
    amount: centsToReal(transaction.amount),
  }
}

function treatBalance(balance: ResponseBalance) {
  return {
    balance: centsToReal(balance.balance),
    incomes: centsToReal(balance.incomes),
    expenses: centsToReal(balance.expenses),
  }
}

function treatTransactionMeta(meta: ResponseBalance) {
  return {
    ...meta,
    balance: centsToReal(meta.balance),
    incomes: centsToReal(meta.incomes),
    expenses: centsToReal(meta.expenses),
  }
}

export async function fetchTransactions(
  options?: Pick<Options, 'page' | 'date'>,
): BackendResponse<{ transactions: ResponseTransaction[] }> {
  const response = await axiosInstance.get(urls.transactions, { params: options })
  const transactions = response.data.transactions.map(treatTransaction)
  const meta = treatTransactionMeta(response.meta)

  return { ...response, data: { transactions }, meta }
}

export async function latestTransactions(): BackendResponse<{
  transactions: ResponseTransaction[]
}> {
  const response = await axiosInstance.get(`${urls.transactions}/latest`)
  const transactions = response.data.transactions.map(treatTransaction)

  return { ...response, data: { transactions } }
}

export async function getTransactionsBalance(): BackendResponse<ResponseBalance> {
  const response = await axiosInstance.get(`${urls.transactions}/balance`)
  const balance = treatBalance(response.data)

  return { ...response, data: balance }
}

export async function createTransaction(payload: CreateTransactionPayload) {
  return await axiosInstance.post(urls.transactions, {
    ...payload,
    amount: realToCents(payload.amount),
  })
}

export async function deleteTransaction(id: string) {
  return await axiosInstance.delete(`${urls.transactions}/${id}`)
}

export async function getTransactionGraphicsWeek() {
  const response = await axiosInstance.get(`${urls.transactions}/graphics/week`)
  const week = response.data.week.map(treatTransaction) as ResponseBalance[]

  return { ...response, data: { week } }
}

export async function getTransactionGraphicsMonth() {
  const response = await axiosInstance.get(`${urls.transactions}/graphics/month`)
  const month = response.data.month.map(treatTransaction) as ResponseBalance[]

  return { ...response, data: { month } }
}

export async function getTransactionGraphicsYear() {
  const response = await axiosInstance.get(`${urls.transactions}/graphics/year`)
  const year = response.data.year.map(treatTransaction) as ResponseBalance[]

  return { ...response, data: { year } }
}

export async function markTransactionAsPaid(id: string): BackendResponse<ResponseMarkAsPaid> {
  return await axiosInstance.patch(`${urls.transactions}/${id}/paid`)
}
