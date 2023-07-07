import { useQuery as useReactQuery, UseQueryOptions } from 'react-query'

interface IUseQueryOptions<TData> extends UseQueryOptions<TData> {}

export function useQuery<TData>(options: IUseQueryOptions<TData>) {
  const values = useReactQuery({
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5, // 5 minute,
    ...options,
  })

  return { ...values, data: values?.data }
}
