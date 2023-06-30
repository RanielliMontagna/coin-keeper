import { useEffect } from 'react'

import { quotes } from 'api/services/services'
import { useAppStore } from 'store/app/app'
import { useQuery } from 'hooks/useQuery'

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
  const { handleErrors } = useAppStore()

  const {
    data: quotesData,
    isLoading: quoteIsloading,
    error,
  } = useQuery({
    queryKey: ['quotes'],
    queryFn: async () => {
      const res = await quotes()
      return res.data
    },
    refetchInterval: 1000 * 60 * 5, // 5 minute,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (error) {
      handleErrors(error)
    }
  }, [error])

  return {
    quotesData: quotesData?.data as Quotes,
    quoteIsloading,
  }
}
