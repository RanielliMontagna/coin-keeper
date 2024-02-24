import { axiosInstance } from 'libs/axios'
import { urls } from 'api/urls'
import { realToCents } from 'utils/realToCents'

import type { CreateRecurringTransactionPayload } from './recurringTransactions.types'

export async function createRecurringTransaction(payload: CreateRecurringTransactionPayload) {
  return await axiosInstance.post(urls.recurringTransactions, {
    ...payload,
    amount: realToCents(payload.amount),
  })
}
