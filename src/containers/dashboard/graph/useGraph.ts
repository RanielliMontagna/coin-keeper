import { useMemo, useState } from 'react'

import { useQuery } from 'hooks/useQuery'
import {
  getTransactionGraphicsWeek,
  getTransactionGraphicsMonth,
  getTransactionGraphicsYear,
} from 'api/transactions/transactions'
import { centsToReal } from 'utils/centsToReal'

export enum SelectPeriod {
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export function useGraph() {
  const [period, setPeriod] = useState<SelectPeriod>(SelectPeriod.YEAR)

  const { data: periodData, isLoading } = useQuery({
    queryKey: [period],
    queryFn: async () => {
      if (period === SelectPeriod.WEEK) {
        const res = await getTransactionGraphicsWeek()
        return res.data?.week
      }
      if (period === SelectPeriod.MONTH) {
        const res = await getTransactionGraphicsMonth()
        return res.data?.month
      }
      if (period === SelectPeriod.YEAR) {
        const res = await getTransactionGraphicsYear()
        return res.data?.year
      }
    },
    staleTime: 1000 * 60 * 5, // 2 minutos
  })

  function handlePeriodChange(period: SelectPeriod) {
    setPeriod(period)
  }

  const treatedData = useMemo(() => {
    if (!periodData) return []

    return periodData?.map((item, index) => ({
      balance: centsToReal(item.balance),
      incomes: centsToReal(item.incomes),
      expenses: centsToReal(item.expenses),
      index,
    }))
  }, [periodData])

  return { period, treatedData, isLoading, handlePeriodChange }
}
