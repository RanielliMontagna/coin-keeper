import dayjs from 'dayjs'
import { PropsWithChildren, useCallback, useState } from 'react'
import { createContext, useContextSelector } from 'use-context-selector'

import {
  AddTransactionTypeEnum,
  type AddTransaction,
  type ITransactionsContext,
} from './transactions.context.types'

import { AddTransactionDialog } from 'containers/transactions/addTransactionDialog/addTransactionDialog'

export const TransactionsContext = createContext({} as ITransactionsContext)

export const TransactionsProvider = ({ children }: PropsWithChildren) => {
  const [addTransaction, setAddTransaction] = useState<AddTransaction>({
    opened: false,
    type: null,
    defaultDate: dayjs().toDate(),
  })

  const handleAddIncome = useCallback(() => {
    setAddTransaction({ opened: true, type: AddTransactionTypeEnum.INCOME })
  }, [])

  const handleAddExpense = useCallback((date?: Date) => {
    setAddTransaction({ opened: true, type: AddTransactionTypeEnum.EXPENSE, defaultDate: date })
  }, [])

  const handleAddCreditExpense = useCallback(() => {
    setAddTransaction({ opened: true, type: AddTransactionTypeEnum.CREDIT })
  }, [])

  const handleCloseAddTransaction = useCallback(() => {
    setAddTransaction({ opened: false, type: null })
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ handleAddIncome, handleAddExpense, handleAddCreditExpense }}
    >
      {children}
      {addTransaction.opened && addTransaction.type != null && (
        <AddTransactionDialog
          type={addTransaction.type}
          onClose={handleCloseAddTransaction}
          defaultDate={addTransaction.defaultDate}
        />
      )}
    </TransactionsContext.Provider>
  )
}

export function useTransactionsContext() {
  return useContextSelector(TransactionsContext, (context) => context)
}
