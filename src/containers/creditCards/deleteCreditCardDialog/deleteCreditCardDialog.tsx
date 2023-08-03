import type { ResponseCreditCard } from 'api/creditCards/creditCards.types'

import { useDeleteModal } from '@quantun/hooks'

import { useAppStore } from 'store/app/app'
import { useApiCall } from 'hooks/useApiCall'
import { deleteCreditCard } from 'api/creditCards/creditCards'
import { queryClient } from 'libs/react-query'

export function useDeleteCreditCardModal() {
  const { addNotification } = useAppStore()
  const { call } = useApiCall()

  function handleSubmit(creditCard: ResponseCreditCard) {
    call(
      () => deleteCreditCard(creditCard.id),
      () => {
        queryClient.invalidateQueries('creditCards')
        addNotification({
          title: 'Credit card deleted',
          message: `Credit card ${creditCard.name} was deleted`,
        })
      },
    )
  }

  function openDeleteModal(creditCard: ResponseCreditCard) {
    useDeleteModal({
      title: 'Delete credit card?',
      text: (
        <>
          Are you sure you want to delete credit card <b>{creditCard.name}</b>?
        </>
      ),
      labels: { confirm: 'Delete credit card' },
      onConfirm: () => handleSubmit(creditCard),
    }).openDeleteModal()
  }

  return { openDeleteModal }
}
