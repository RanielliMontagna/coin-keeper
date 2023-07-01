import { useAppStore } from 'store/app/app'

export function useApiCall() {
  const { setLoading, handleErrors } = useAppStore()

  async function call<T>(fn: () => Promise<T>, callback?: (result: T) => void): Promise<T> {
    try {
      setLoading(true)
      const result = await fn()

      if (callback) callback(result)

      return result
    } catch (error) {
      handleErrors(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  async function callWithoutLoading<T>(
    fn: () => Promise<T>,
    callback?: (result: T) => void,
  ): Promise<T> {
    try {
      const result = await fn()

      if (callback) callback(result)

      return result
    } catch (error) {
      handleErrors(error)
      throw error
    }
  }

  return { call, callWithoutLoading }
}
