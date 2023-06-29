import { useQuery } from 'react-query'

import { quotes } from 'api/services/services'

interface Quote {
  price: string
  variation: string
}

interface Quotes {
  dollar: Quote
  euro: Quote
  bitcoin: Quote
  ibovespa: Quote
}

export function useQuotes() {
  const { data: quotesData, isLoading: quoteIsloading } = useQuery({
    queryKey: ['quotes'],
    queryFn: async () => {
      const res = await quotes()
      return res.data
    },
    refetchInterval: 1000 * 60 * 5, // 5 minute,
  })

  return {
    quotesData: quotesData?.data as Quotes,
    quoteIsloading,
  }
}
