import { renderHook } from '@testing-library/react'
import { useQuery } from 'hooks/useQuery'

describe('@hooks/useQuery', () => {
  it('should return the correct response', async () => {
    const { result } = renderHook(() => useQuery({ queryKey: 'key' }))
    expect(result.current.data).toBeUndefined()

    result.current.refetch()
    expect(result.current.data).toBeUndefined()
  })
})
