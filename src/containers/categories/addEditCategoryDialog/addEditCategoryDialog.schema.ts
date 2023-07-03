import { z } from 'zod'
import { CategoryColorsEnum } from 'api/categories/categories.types'

export const addEditCategorySchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  description: z.string().optional(),
  color: z
    .string()
    .optional()
    .refine((value) => {
      if (!value) return true
      return Object.keys(CategoryColorsEnum).includes(value)
    }),
})

export type AddEditCategorySchema = z.infer<typeof addEditCategorySchema>
