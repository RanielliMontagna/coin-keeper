import { z } from 'zod'

export const addTransactionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  amount: z.coerce.number().positive('Amount is required'),
  category: z.string().min(1, 'Category is required'),
  account: z.string().min(1, 'Account is required'),
  creditCard: z.string().min(1, 'Credit card is required'),
  date: z.date().optional(),
  isRecurring: z.boolean().optional(),
  frequency: z.coerce.number(),
  repetition: z.number().min(2, 'Repetition must be 2 or more').optional(),
  isPaid: z.boolean().default(true),
})

export const addTransactionSchemaCredit = addTransactionSchema.omit({
  account: true,
  isPaid: true,
})

export const addTransactionSchemaIncomeOrExpense = addTransactionSchema.omit({
  creditCard: true,
})

export type AddTransactionSchema = z.infer<typeof addTransactionSchema>
export type AddTransactionSchemaCredit = z.infer<typeof addTransactionSchemaCredit>
export type AddTransactionSchemaIncomeOrExpense = z.infer<
  typeof addTransactionSchemaIncomeOrExpense
>
