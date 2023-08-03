import { useDeleteModal } from '@quantun/hooks'

import { useAppStore } from 'store/app/app'
import { useApiCall } from 'hooks/useApiCall'
import { queryClient } from 'libs/react-query'
import { deleteTransaction } from 'api/transactions/transactions'
import { ResponseTransaction, TransactionTypeEnum } from 'api/transactions/transactions.types'
import { capitalize } from 'utils/capitalize'
import { toLowerCase } from 'utils/toLowerCase'

export function useDeleteIncomeExpenseModal() {
  const { addNotification } = useAppStore()
  const { call } = useApiCall()

  function handleSubmit(transaction: ResponseTransaction) {
    const transactionType = TransactionTypeEnum?.[transaction?.type]

    call(
      () => deleteTransaction(transaction.id),
      () => {
        queryClient.invalidateQueries('transactions')
        queryClient.invalidateQueries('accounts')
        queryClient.invalidateQueries('week')
        queryClient.invalidateQueries('month')
        queryClient.invalidateQueries('year')
        addNotification({
          title: `${capitalize(transactionType)} deleted`,
          message: `${capitalize(transactionType)} ${transaction.title} was deleted successfully`,
        })
      },
    )
  }

  function openDeleteModal(transaction: ResponseTransaction) {
    const transactionType = TransactionTypeEnum?.[transaction?.type]

    useDeleteModal({
      title: `Delete ${toLowerCase(transactionType)}?`,
      text: (
        <>
          Are you sure you want to delete the <strong>{transaction.title}</strong>{' '}
          {toLowerCase(transactionType)}?
        </>
      ),
      labels: { confirm: `Delete ${toLowerCase(transactionType)}` },
      onConfirm: () => handleSubmit(transaction),
    }).openDeleteModal()
  }

  return { openDeleteModal }
}
