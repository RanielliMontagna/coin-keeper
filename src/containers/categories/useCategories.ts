import { ChangeEventHandler, useState } from 'react'
import { useDebouncedState } from '@mantine/hooks'

import { fetchCategories } from 'api/categories/categories'
import { useQuery } from 'hooks/useQuery'
import { ResponseCategory } from 'api/categories/categories.types'

interface AddEditModal {
  opened: boolean
  row?: ResponseCategory
}

export function useCategories() {
  const [search, setSearch] = useDebouncedState('', 500)
  const [addEditModal, setAddEdit] = useState<AddEditModal>({ opened: false })

  const { data, isLoading } = useQuery({
    queryKey: ['categories', search],
    queryFn: async () => {
      const res = await fetchCategories(search ? { search } : undefined)
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  })

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value)
  }

  function handleOpenEditModal(row?: ResponseCategory) {
    setAddEdit({ opened: true, row })
  }

  function handleCloseEditModal() {
    setAddEdit({ opened: false })
  }

  return {
    records: data?.data?.categories,
    isLoading,
    search,
    addEditModal,
    onChange,
    handleOpenEditModal,
    handleCloseEditModal,
  }
}
