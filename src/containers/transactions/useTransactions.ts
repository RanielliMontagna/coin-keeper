import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import { fetchTransactions } from 'api/transactions/transactions'
import {
  MetaTransaction,
  ResponseTransaction,
  TransactionTypeEnum,
} from 'api/transactions/transactions.types'
import { useInfiniteQuery } from 'hooks/useInfiniteQuery'

interface AddIncomeExpense {
  opened: boolean
  type: TransactionTypeEnum | null
  defaultDate?: Date
}

export function useTransactions() {
  const [selectedMonth, setSelectedMonth] = useState<Date>(dayjs().startOf('month').toDate())
  const [addIncomeExpense, setAddIncomeExpense] = useState<AddIncomeExpense>({
    opened: false,
    type: null,
    defaultDate: dayjs().toDate(),
  })

  const { data, meta, isLoading, handleFetchNextPage, refetch } = useInfiniteQuery({
    queryKey: ['transactions'],
    queryFn: async ({ pageParam }) =>
      await fetchTransactions({ page: pageParam, date: selectedMonth.toISOString() }),
  })

  const handleAddIncome = () => {
    setAddIncomeExpense({ opened: true, type: TransactionTypeEnum.INCOME })
  }

  const handleAddExpense = (date?: Date) => {
    setAddIncomeExpense({ opened: true, type: TransactionTypeEnum.EXPENSE, defaultDate: date })
  }

  const handleCloseAddIncomeExpense = () => {
    setAddIncomeExpense({ opened: false, type: null })
  }

  useEffect(() => {
    refetch()
  }, [selectedMonth])

  return {
    transactions: data as ResponseTransaction[],
    meta: meta as MetaTransaction,
    isLoading,
    addIncomeExpense,
    selectedMonth,
    setSelectedMonth,
    handleFetchNextPage,
    handleAddIncome,
    handleAddExpense,
    handleCloseAddIncomeExpense,
  }
}
