import { useQuery as useReactQuery, UseQueryOptions } from 'react-query'

interface IUseQueryOptions extends UseQueryOptions {}

export function useQuery(options: IUseQueryOptions) {
  const values = useReactQuery({
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5, // 5 minute,
    ...options,
  })

  return {
    ...values,
    data: values?.data as any,
  }
}