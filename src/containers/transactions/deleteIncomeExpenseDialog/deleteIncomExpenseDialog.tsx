import { useDeleteModal } from '@quantun/hooks'

import { useAppStore } from 'store/app/app'
import { useApiCall } from 'hooks/useApiCall'
import { queryClient } from 'libs/react-query'
import { deleteTransaction } from 'api/transactions/transactions'
import { ResponseTransaction } from 'api/transactions/transactions.types'
import { capitalize } from 'utils/capitalize'
import { toLowerCase } from 'utils/toLowerCase'

export function useDeleteIncomeExpenseModal() {
  const { addNotification } = useAppStore()
  const { call } = useApiCall()

  function handleSubmit(transaction: ResponseTransaction) {
    call(
      () => deleteTransaction(transaction.id),
      () => {
        queryClient.invalidateQueries('transactions')
        queryClient.invalidateQueries('accounts')
        queryClient.invalidateQueries('week')
        queryClient.invalidateQueries('month')
        queryClient.invalidateQueries('year')
        addNotification({
          title: `${capitalize(transaction.type)} deleted`,
          message: `${capitalize(transaction.type)} ${transaction.title} was deleted successfully`,
        })
      },
    )
  }

  function openDeleteModal(transaction: ResponseTransaction) {
    useDeleteModal({
      title: `Delete ${toLowerCase(transaction.type)}?`,
      text: (
        <>
          Are you sure you want to delete the <strong>{transaction.title}</strong>{' '}
          {toLowerCase(transaction.type)}?
        </>
      ),
      labels: { confirm: `Delete ${toLowerCase(transaction.type)}` },
      onConfirm: () => handleSubmit(transaction),
    }).openDeleteModal()
  }

  return { openDeleteModal }
}
