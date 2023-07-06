import type { IAddEditAccountDialogProps } from './addEditAccountDialog'
import type { AddEditAccountSchema } from './addEditAccountDialog.schema'

import { createAccount, updateAccount } from 'api/accounts/accounts'
import { InstitutionTypeEnum } from 'api/accounts/accounts.types'
import { useApiCall } from 'hooks/useApiCall'
import { queryClient } from 'libs/react-query'
import { useAppStore } from 'store/app/app'

export function useAddEditAccountDialog({ id, onClose }: IAddEditAccountDialogProps) {
  const { addNotification } = useAppStore()
  const { call } = useApiCall()

  const handleSubmit = (values: AddEditAccountSchema) => {
    if (id) {
      call(
        () =>
          updateAccount(id, {
            name: values.name,
            balance: Number(values.balance),
            institution: values.institution || InstitutionTypeEnum.OTHER,
          }),
        () => {
          queryClient.invalidateQueries('accounts')
          addNotification({
            title: 'Account updated',
            message: `Account ${values.name} updated successfully`,
          })
          onClose()
        },
      )
    } else {
      call(
        () =>
          createAccount({
            name: values.name,
            balance: Number(values.balance),
            institution: values.institution || InstitutionTypeEnum.OTHER,
          }),
        () => {
          queryClient.invalidateQueries('accounts')
          addNotification({
            title: 'Account created',
            message: `Account ${values.name} created successfully`,
          })
          onClose()
        },
      )
    }
  }

  return { handleSubmit }
}
