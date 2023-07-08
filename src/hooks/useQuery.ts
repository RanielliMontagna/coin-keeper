import { useEffect } from 'react'
import { useQuery as useReactQuery, UseQueryOptions } from 'react-query'
import { useAppStore } from 'store/app/app'

interface IUseQueryOptions<TData> extends UseQueryOptions<TData> {}

export function useQuery<TData>(options: IUseQueryOptions<TData>) {
  const { handleErrors } = useAppStore()

  const values = useReactQuery({
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5, // 5 minute,
    ...options,
  })

  useEffect(() => {
    if (values.error) {
      handleErrors(values.error)
    }
  }, [values.error])

  return { ...values, data: values?.data }
}
