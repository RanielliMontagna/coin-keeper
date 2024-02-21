import { InstitutionTypeEnum } from 'api/accounts/accounts.types'
import { CategoryColorsEnum } from 'api/categories/categories.types'

export enum TransactionTypeEnum {
  INCOME = 0,
  EXPENSE = 1,
}

export interface CreateTransactionPayload {
  isPaid?: boolean
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
    institution: InstitutionTypeEnum
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
  isPaid: boolean
}

export interface ResponseBalance {
  balance: number
  incomes: number
  expenses: number
}

export interface ResponseTransactionGraphicsWeek {
  week: ResponseBalance[]
}

export interface ResponseTransactionGraphicsMonth {
  month: ResponseBalance[]
}

export interface ResponseTransactionGraphicsYear {
  year: ResponseBalance[]
}
