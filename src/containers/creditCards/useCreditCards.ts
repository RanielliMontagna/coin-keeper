import { fetchCreditCards } from 'api/creditCards/creditCards'
import { useQuery } from 'hooks/useQuery'

export function useCreditCards() {
  const { data, isLoading } = useQuery({
    queryKey: ['creditCards'],
    queryFn: async () => {
      const res = await fetchCreditCards()
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  })

  return {
    records: data?.data?.creditCards || [],
    isLoading,
  }
}
