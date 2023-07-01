import type { ResponseAccount } from 'api/accounts/accounts.types'

import { useDeleteModal } from '@quantun/hooks'

import { useAppStore } from 'store/app/app'
import { useApiCall } from 'hooks/useApiCall'
import { deleteAccount } from 'api/accounts/accounts'
import { queryClient } from 'libs/react-query'

export function useDeleteAccountModal() {
  const { addNotification } = useAppStore()
  const { call } = useApiCall()

  function handleSubmit(account: ResponseAccount) {
    call(
      () => deleteAccount(account.id),
      () => {
        queryClient.invalidateQueries('accounts')
        addNotification({
          title: 'Account deleted',
          message: `Account ${account.name} was deleted successfully`,
        })
      },
    )
  }

  function openDeleteModal(account: ResponseAccount) {
    useDeleteModal({
      title: 'Delete account?',
      text: (
        <>
          Are you sure you want to delete account <strong>{account.name}</strong>?
        </>
      ),
      labels: { confirm: 'Delete account' },
      onConfirm: () => handleSubmit(account),
    }).openDeleteModal()
  }

  return {
    openDeleteModal,
  }
}
