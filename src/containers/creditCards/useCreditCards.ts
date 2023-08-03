import { useState } from 'react'

import { ResponseAccount } from 'api/accounts/accounts.types'
import { fetchCreditCards } from 'api/creditCards/creditCards'
import { useQuery } from 'hooks/useQuery'

interface AddEditCreditCardModal {
  opened: boolean
  row?: ResponseAccount
}

export function useCreditCards() {
  const [addEditModal, setAddEdit] = useState<AddEditCreditCardModal>({ opened: false })

  const { data, isLoading } = useQuery({
    queryKey: ['creditCards'],
    queryFn: async () => {
      const res = await fetchCreditCards()
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  })

  function handleOpenEditModal(row?: ResponseAccount) {
    setAddEdit({ opened: true, row })
  }

  function handleCloseEditModal() {
    setAddEdit({ opened: false })
  }

  return {
    records: data?.creditCards || [],
    isLoading,
    addEditModal,
    handleOpenEditModal,
    handleCloseEditModal,
  }
}
