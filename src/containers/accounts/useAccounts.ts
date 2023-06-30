import { ChangeEventHandler, useState } from 'react'
import { useDebouncedState } from '@mantine/hooks'

import { fetchAccounts } from 'api/accounts/accounts'
import { useQuery } from 'hooks/useQuery'
import { ResponseAccount } from 'api/accounts/accounts.types'

interface AddEditModal {
  opened: boolean
  row?: ResponseAccount
}

export function useAccounts() {
  const [search, setSearch] = useDebouncedState('', 500)

  const [addEditModal, setAddEdit] = useState<AddEditModal>({ opened: false })

  const { data, isLoading } = useQuery({
    queryKey: ['accounts', search],
    queryFn: async () => {
      const res = await fetchAccounts(search ? { search } : undefined)
      return res.data
    },
    refetchInterval: 5000,
  })

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value)
  }

  function handleOpenEditModal(row?: ResponseAccount) {
    setAddEdit({ opened: true, row })
  }

  function handleCloseEditModal() {
    setAddEdit({ opened: false })
  }

  return {
    records: (data as any)?.data?.accounts,
    isLoading,
    search,
    addEditModal,
    onChange,
    handleOpenEditModal,
    handleCloseEditModal,
  }
}
