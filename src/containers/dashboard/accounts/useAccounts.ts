import { fetchAccounts } from 'api/accounts/accounts'
import { ResponseAccount } from 'api/accounts/accounts.types'
import { useQuery } from 'hooks/useQuery'

export function useAccounts() {
  const { data, isLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const res = await fetchAccounts()

      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  })

  return {
    accounts: data?.accounts.slice(0, 3) as ResponseAccount[],
    isLoading,
  }
}
