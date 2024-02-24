import { useEffect, useMemo } from 'react'
import {
  useInfiniteQuery as useInfiniteQueryRQ,
  UseInfiniteQueryOptions,
  FetchNextPageOptions,
} from 'react-query'

import { useAppStore } from 'store/app/app'

interface IUseInfiniteQueryProps extends UseInfiniteQueryOptions {}
type Page = any

export function useInfiniteQuery(props: IUseInfiniteQueryProps) {
  const { handleErrors } = useAppStore()

  const {
    data: dataRQ,
    error,
    isLoading,
    hasNextPage,
    refetch,
    fetchNextPage,
  } = useInfiniteQueryRQ({
    getNextPageParam: (lastPage: Page) => {
      const countItems = lastPage?.data?.[Object.keys(lastPage?.data)[0]]?.length
      if (countItems < 15) return false

      return (lastPage?.meta?.page || 0) + 1
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    cacheTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    ...props,
  })

  const data = useMemo(() => {
    if (!dataRQ) return []

    const dataReturn = [] as Page[]

    const pages = dataRQ?.pages?.map((page: Page) => page?.data)

    pages?.forEach((page: Page) => {
      dataReturn?.push(...page[Object.keys(page)[0]])
    })

    return dataReturn || []
  }, [dataRQ])

  const meta = useMemo(() => {
    const lastPage = (dataRQ?.pages?.[dataRQ?.pages?.length - 1] as Page)?.meta

    return { ...lastPage }
  }, [dataRQ])

  function handleFetchNextPage(options?: FetchNextPageOptions | undefined) {
    if (hasNextPage) fetchNextPage({ pageParam: (meta?.page || 0) + 1, ...options })
  }

  useEffect(() => {
    if (error) {
      handleErrors(error)
    }
  }, [error, handleErrors])

  return { data: data, meta, hasNextPage, isLoading, refetch, handleFetchNextPage }
}
