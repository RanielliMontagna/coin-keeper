import type { IAddEditCategoryDialogProps } from './addEditCategoryDialog'
import type { AddEditCategorySchema } from './addEditCategoryDialog.schema'

import { createCategory, updateCategory } from 'api/categories/categories'

import { useApiCall } from 'hooks/useApiCall'
import { queryClient } from 'libs/react-query'
import { useAppStore } from 'store/app/app'

export function useAddEditCategoryDialog({ id, onClose }: IAddEditCategoryDialogProps) {
  const { addNotification } = useAppStore()
  const { call } = useApiCall()

  const handleSubmit = (values: AddEditCategorySchema) => {
    if (id) {
      call(
        () =>
          updateCategory(id, {
            name: values.name,
            description: values.description,
            color: values.color ? Number(values.color) : undefined,
          }),
        () => {
          queryClient.invalidateQueries('categories')
          queryClient.invalidateQueries('transactions')
          addNotification({
            title: 'Category updated',
            message: `Category ${values.name} updated successfully`,
          })
          onClose()
        },
      )
    } else {
      call(
        () =>
          createCategory({
            name: values.name,
            description: values.description,
            color: Number(values.color),
          }),
        () => {
          queryClient.invalidateQueries('categories')
          addNotification({
            title: 'Category created',
            message: `Category ${values.name} created successfully`,
          })
          onClose()
        },
      )
    }
  }

  return { handleSubmit }
}
