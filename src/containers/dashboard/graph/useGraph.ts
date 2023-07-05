import { useMemo, useState } from 'react'

import { useQuery } from 'hooks/useQuery'
import {
  getTransactionGraphicsWeek,
  getTransactionGraphicsMonth,
  getTransactionGraphicsYear,
} from 'api/transactions/transactions'
import { ResponseBalance } from 'api/transactions/transactions.types'

export enum SelectPeriod {
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export function useGraph() {
  const [period, setPeriod] = useState<SelectPeriod>(SelectPeriod.WEEK)

  const { data: periodData, isLoading } = useQuery({
    queryKey: [period],
    queryFn: async () => {
      if (period === SelectPeriod.WEEK) {
        const res = await getTransactionGraphicsWeek()
        return res.data
      }
      if (period === SelectPeriod.MONTH) {
        const res = await getTransactionGraphicsMonth()
        return res.data
      }
      if (period === SelectPeriod.YEAR) {
        const res = await getTransactionGraphicsYear()
        return res.data
      }
    },
    staleTime: 1000 * 60 * 5, // 2 minutos
  })

  function handlePeriodChange(period: SelectPeriod) {
    setPeriod(period)
  }

  const treatedData = useMemo(
    () =>
      periodData?.data?.[period]?.map((period: ResponseBalance, index: number) => ({
        ...period,
        index,
      })),
    [periodData],
  )

  return { period, treatedData, isLoading, handlePeriodChange }
}
