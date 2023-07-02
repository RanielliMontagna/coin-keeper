import { useState } from 'react'

import { fetchTransactions } from 'api/transactions/transactions'
import { useQuery } from 'hooks/useQuery'
import { TransactionTypeEnum } from 'api/transactions/transactions.types'

interface AddIncomeExpense {
  opened: boolean
  type: TransactionTypeEnum | null
}

export function useTransactions() {
  const [addIncomeExpense, setAddIncomeExpense] = useState<AddIncomeExpense>({
    opened: false,
    type: null,
  })

  const { data, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const res = await fetchTransactions()
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
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
    transactions: data?.data?.transactions,
    isLoading,
    addIncomeExpense,
    handleAddIncome,
    handleAddExpense,
    handleCloseAddIncomeExpense,
  }
}
