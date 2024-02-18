import { z } from 'zod'
import { FrequencyEnum } from './recurringFields/recurringFields'

export const addIncomeExpenseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  amount: z.coerce.number().positive('Amount is required'),
  category: z.string().min(1, 'Category is required'),
  account: z.string().min(1, 'Account is required'),
  date: z.date().optional(),
  isRecurring: z.boolean().optional(),
  frequency: z.nativeEnum(FrequencyEnum).optional(),
  repetition: z.number().min(2, 'Repetition must be 2 or more').optional(),
})

export type AddIncomeExpenseSchema = z.infer<typeof addIncomeExpenseSchema>
