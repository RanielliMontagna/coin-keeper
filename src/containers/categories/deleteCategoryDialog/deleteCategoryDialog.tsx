import type { ResponseCategory } from 'api/categories/categories.types'

import { useDeleteModal } from '@quantun/hooks'

import { useAppStore } from 'store/app/app'
import { useApiCall } from 'hooks/useApiCall'
import { deleteCategory } from 'api/categories/categories'
import { queryClient } from 'libs/react-query'

export function useDeleteCategoryModal() {
  const { addNotification } = useAppStore()
  const { call } = useApiCall()

  function handleSubmit(category: ResponseCategory) {
    call(
      () => deleteCategory(category.id),
      () => {
        queryClient.invalidateQueries('categories')
        addNotification({
          title: 'Category deleted',
          message: `Category ${category.name} was deleted successfully`,
        })
      },
    )
  }

  function openDeleteModal(category: ResponseCategory) {
    useDeleteModal({
      title: 'Delete category?',
      text: (
        <>
          Are you sure you want to delete category <strong>{category.name}</strong>?
        </>
      ),
      labels: { confirm: 'Delete category' },
      onConfirm: () => handleSubmit(category),
    }).openDeleteModal()
  }

  return { openDeleteModal }
}
