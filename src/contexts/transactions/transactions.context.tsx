import React, { PropsWithChildren, useCallback, useState } from 'react'
import dayjs from 'dayjs'

import { createContext, useContextSelector } from 'use-context-selector'

import type { AddIncomeExpense, ITransactionsContext } from './transactions.context.types'
import { TransactionTypeEnum } from 'api/transactions/transactions.types'

import { AddIncomeExpenseDialog } from 'containers/transactions/addIncomeExpenseDialog/addIncomeExpenseDialog'

export const TransactionsContext = createContext({} as ITransactionsContext)

export const TransactionsProvider = ({ children }: PropsWithChildren) => {
  const [addIncomeExpense, setAddIncomeExpense] = useState<AddIncomeExpense>({
    opened: false,
    type: null,
    defaultDate: dayjs().toDate(),
  })

  const handleAddIncome = useCallback(() => {
    setAddIncomeExpense({ opened: true, type: TransactionTypeEnum.INCOME })
  }, [])

  const handleAddExpense = useCallback((date?: Date) => {
    setAddIncomeExpense({ opened: true, type: TransactionTypeEnum.EXPENSE, defaultDate: date })
  }, [])

  const handleCloseAddIncomeExpense = useCallback(() => {
    setAddIncomeExpense({ opened: false, type: null })
  }, [])

  return (
    <TransactionsContext.Provider value={{ handleAddIncome, handleAddExpense }}>
      {children}
      {addIncomeExpense.opened && addIncomeExpense.type != null && (
        <AddIncomeExpenseDialog
          type={addIncomeExpense.type}
          onClose={handleCloseAddIncomeExpense}
          defaultDate={addIncomeExpense.defaultDate}
        />
      )}
    </TransactionsContext.Provider>
  )
}

export function useTransactionsContext() {
  return useContextSelector(TransactionsContext, (context) => context)
}
