export enum AddTransactionTypeEnum {
  INCOME = 0,
  EXPENSE = 1,
  CREDIT = 2,
}

export interface AddTransaction {
  opened: boolean
  type: AddTransactionTypeEnum | null
  defaultDate?: Date
}

export interface ITransactionsContext {
  handleAddIncome: () => void
  handleAddExpense: (date?: Date) => void
  handleAddCreditExpense: () => void
}
