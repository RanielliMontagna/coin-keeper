import { fetchConfigs, updateConfigs } from 'api/configs/configs'
import { ConfigsSchema } from './configs.schema'
import { useQuery } from 'hooks/useQuery'
import { useAppStore } from 'store/app/app'

export function useConfig() {
  const { handleErrors, addNotification } = useAppStore()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['configs'],
    queryFn: async () => {
      const res = await fetchConfigs()
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  })

  const autoMarkAsPaid = data?.configs?.find((config) => config.key === 'auto_mark_as_paid')

  async function handleSubmit(values: ConfigsSchema) {
    try {
      const configs = [{ ...autoMarkAsPaid!, value: values.auto_mark_as_paid ? 'true' : 'false' }]

      await updateConfigs({ configs: configs })

      addNotification({
        title: 'Configurations updated',
        message: 'Configurations updated successfully',
      })

      refetch()
    } catch (error) {
      handleErrors(error)
      throw error
    }
  }

  return {
    configs: data?.configs,
    isLoading,
    handleSubmit,
  }
}
