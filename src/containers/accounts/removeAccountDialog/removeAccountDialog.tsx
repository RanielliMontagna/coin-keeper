import { ResponseAccount } from 'api/accounts/accounts.types'
import { useDeleteModal } from 'hooks/useDeleteModal'

export function useDeleteAccountModal() {
  function openDeleteModal(account: ResponseAccount) {
    useDeleteModal({
      title: 'Delete account?',
      text: (
        <>
          Are you sure you want to delete account <strong>{account.name}</strong>?
        </>
      ),
      labels: { confirm: 'Delete account' },
    })()
  }

  return {
    openDeleteModal,
  }
}
