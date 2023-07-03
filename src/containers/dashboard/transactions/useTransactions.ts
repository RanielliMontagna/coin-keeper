import { latestTransactions } from 'api/transactions/transactions'
import { useQuery } from 'hooks/useQuery'

export function useTransactions() {
  const { data, isLoading } = useQuery({
    queryKey: ['latestTransactions'],
    queryFn: async () => {
      const res = await latestTransactions()
      return res.data
    },
  })

  return {
    transactions: data?.data?.transactions,
    isLoading,
  }
}
