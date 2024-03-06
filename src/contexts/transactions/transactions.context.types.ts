import type { TransactionTypeEnum } from 'api/transactions/transactions.types'

export interface AddIncomeExpense {
  opened: boolean
  type: TransactionTypeEnum | null
  defaultDate?: Date
}

export interface ITransactionsContext {
  handleAddIncome: () => void
  handleAddExpense: (date?: Date) => void
}
