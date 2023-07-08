import { fetchAccounts } from 'api/accounts/accounts'
import { useAppStore } from 'store/app/app'
import { queryClient } from 'libs/react-query'
import { useQuery } from 'hooks/useQuery'
import { useApiCall } from 'hooks/useApiCall'

import { AddEditCreditCardSchema } from './addEditCreditCardDialog.schema'
import { IAddEditCreditCardDialogProps } from './addEditCreditCardDialog'
import { createCreditCard, updateCreditCard } from 'api/creditCards/creditCards'

export function useAddEditCreditCardDialog({ id, onClose }: IAddEditCreditCardDialogProps) {
  const { addNotification } = useAppStore()
  const { call } = useApiCall()

  const { data } = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const res = await fetchAccounts()
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  })

  const handleSubmit = (values: AddEditCreditCardSchema) => {
    if (id) {
      call(
        () =>
          updateCreditCard(id, {
            name: values.name,
            limit: Number(values.limit),
            flag: Number(values.flag),
            closingDay: Number(values.closingDay),
            dueDay: Number(values.dueDay),
            accountId: values.account,
          }),
        () => {
          queryClient.invalidateQueries('creditCards')
          addNotification({
            title: 'Credit Card updated',
            message: `Credit Card ${values.name} updated successfully`,
          })
          onClose()
        },
      )
    } else {
      call(
        () =>
          createCreditCard({
            name: values.name,
            limit: Number(values.limit),
            flag: Number(values.flag),
            closingDay: Number(values.closingDay),
            dueDay: Number(values.dueDay),
            accountId: values.account,
          }),
        () => {
          queryClient.invalidateQueries('creditCards')
          addNotification({
            title: 'Credit Card created',
            message: `Credit Card ${values.name} created successfully`,
          })
          onClose()
        },
      )
    }
  }

  const selectAccounts = data?.data?.accounts.map((account) => ({
    value: account.id,
    label: account.name,
    institution: account.institution,
  }))

  return { handleSubmit, accounts: selectAccounts || [] }
}
