import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import { fetchTransactions, markTransactionAsPaid } from 'api/transactions/transactions'
import { MetaTransaction, ResponseTransaction } from 'api/transactions/transactions.types'
import { useInfiniteQuery } from 'hooks/useInfiniteQuery'
import { useApiCall } from 'hooks/useApiCall'

export function useTransactions() {
  const { call } = useApiCall()

  const [selectedMonth, setSelectedMonth] = useState<Date>(dayjs().startOf('month').toDate())

  const { data, meta, isLoading, handleFetchNextPage, refetch } = useInfiniteQuery({
    queryKey: ['transactions'],
    queryFn: async ({ pageParam }) =>
      await fetchTransactions({ page: pageParam, date: selectedMonth.toISOString() }),
  })

  function handleMarkAsPaid(transaction: ResponseTransaction) {
    call(
      () => markTransactionAsPaid(transaction.id),
      () => refetch(),
    )
  }

  useEffect(() => {
    refetch()
  }, [selectedMonth])

  return {
    transactions: data as ResponseTransaction[],
    meta: meta as MetaTransaction,
    isLoading,
    selectedMonth,
    setSelectedMonth,
    handleFetchNextPage,
    handleMarkAsPaid,
  }
}
