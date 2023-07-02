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

//TODO: Create a type for this
export interface ResponseTransactions {}
