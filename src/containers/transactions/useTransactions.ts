import { useState } from 'react'

import { fetchTransactions } from 'api/transactions/transactions'
import { TransactionTypeEnum } from 'api/transactions/transactions.types'
import { useInfiniteQuery } from 'hooks/useInfiniteQuery'

interface AddIncomeExpense {
  opened: boolean
  type: TransactionTypeEnum | null
}

export function useTransactions() {
  const [addIncomeExpense, setAddIncomeExpense] = useState<AddIncomeExpense>({
    opened: false,
    type: null,
  })

  const { data, isLoading, handleFetchNextPage } = useInfiniteQuery({
    queryKey: ['transactions'],
    queryFn: async ({ pageParam }) => {
      const res = await fetchTransactions({ page: pageParam })
      return res.data
    },
  })

  const handleAddIncome = () => {
    setAddIncomeExpense({ opened: true, type: TransactionTypeEnum.INCOME })
  }

  const handleAddExpense = () => {
    setAddIncomeExpense({ opened: true, type: TransactionTypeEnum.EXPENSE })
  }

  const handleCloseAddIncomeExpense = () => {
    setAddIncomeExpense({ opened: false, type: null })
  }

  return {
    transactions: data,
    isLoading,
    addIncomeExpense,
    handleFetchNextPage,
    handleAddIncome,
    handleAddExpense,
    handleCloseAddIncomeExpense,
  }
}
