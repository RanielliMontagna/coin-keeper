import { QueryClient, QueryClientProvider } from 'react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { useQuery } from 'hooks/useQuery'

describe('@hooks/useQuery', () => {
  it('should return the correct response', async () => {
    const queryClient = new QueryClient()

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    waitFor(() => {
      const { result } = renderHook(() => useQuery({ queryKey: 'key' }), { wrapper })
      expect(result.current.data).toBeUndefined()

      result.current.refetch()
      expect(result.current.data).toBeUndefined()
    })
  })
})
