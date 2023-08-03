import { getTransactionsBalance } from 'api/transactions/transactions'
import { useQuery } from 'hooks/useQuery'

export function useCards() {
  const { data, isLoading } = useQuery({
    queryKey: ['transactionsBalance'],
    queryFn: async () => {
      const res = await getTransactionsBalance()
      return res.data
    },
  })

  return { balance: data?.balance, incomes: data?.incomes, expenses: data?.expenses, isLoading }
}
