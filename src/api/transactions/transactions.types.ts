import { CategoryColorsEnum } from 'api/categories/categories.types'

export enum TransactionTypeEnum {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export interface CreateTransactionPayload {
  title: string
  description?: string
  amount: number
  type: TransactionTypeEnum
  date: string
  accountId: string
  categoryId: string
}
export interface ResponseTransaction {
  account: {
    id: string
    name: string
  }
  amount: number
  category: {
    id: string
    name: string
    color: CategoryColorsEnum
  }
  date: string
  description: string
  id: string
  title: string
  type: TransactionTypeEnum
}

export interface ResponseBalance {
  balance: number
  incomes: number
  expenses: number
}
