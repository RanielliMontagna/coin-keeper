import { z } from 'zod'

export const addIncomeExpenseSchema = z.object({
  title: z.string().nonempty('Title is required'),
  description: z.string().optional(),
  amount: z.coerce.number().positive('Amount is required'),
  category: z.string().nonempty('Category is required'),
  account: z.string().nonempty('Account is required'),
  date: z.date().optional(),
})

export type AddIncomeExpenseSchema = z.infer<typeof addIncomeExpenseSchema>
