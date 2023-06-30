import { useQuery as useReactQuery, UseQueryOptions } from 'react-query'

interface IUseQueryOptions extends UseQueryOptions {}

export function useQuery(options: IUseQueryOptions) {
  const values = useReactQuery({
    retry: 0,
    refetchOnWindowFocus: false,
    ...options,
  })

  return {
    ...values,
    data: values?.data as any,
  }
}
