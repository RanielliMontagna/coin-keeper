import { AddTransactionTypeEnum } from 'contexts/transactions/transactions.context.types'

export enum FrequencyEnum {
  WEEKLY = 0,
  MONTHLY = 1,
  YEARLY = 2,
}

export interface CreateRecurringTransactionPayload {
  title: string
  description?: string
  amount: number
  type: AddTransactionTypeEnum
  frequency: FrequencyEnum
  repeatAmount: number
  startDate: string
  accountId: string
  categoryId: string
}
