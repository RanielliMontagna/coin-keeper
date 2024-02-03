import { useApiCall } from 'hooks/useApiCall'
import { act, renderHook } from '@testing-library/react'

describe('@hooks/useApiCall', () => {
  it('should return the correct response', async () => {
    const { result } = renderHook(() => useApiCall())

    await act(async () => {
      const response = await result.current.call(
        () => Promise.resolve('response'),
        () => {},
      )

      expect(response).toBe('response')
    })
  })

  it('should return the correct error', async () => {
    const { result } = renderHook(() => useApiCall())

    await act(async () => {
      try {
        await result.current.call(() => Promise.reject('error'))
      } catch (error) {
        expect(error).toBe('error')
      }
    })
  })

  it('should return the correct response', async () => {
    const { result } = renderHook(() => useApiCall())

    await act(async () => {
      const response = await result.current.callWithoutLoading(
        () => Promise.resolve('response'),
        () => {},
      )

      expect(response).toBe('response')
    })
  })

  it('should return the correct error', async () => {
    const { result } = renderHook(() => useApiCall())

    await act(async () => {
      try {
        await result.current.callWithoutLoading(() => Promise.reject('error'))
      } catch (error) {
        expect(error).toBe('error')
      }
    })
  })
})
