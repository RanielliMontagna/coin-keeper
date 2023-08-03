import { FlagEnum } from 'api/creditCards/creditCards.types'
import { z } from 'zod'

export const addEditCreditCardSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  limit: z.coerce.number().min(1, { message: 'Limit must be greater than zero' }),
  flag: z.string().refine((value) => {
    return Object.keys(FlagEnum).includes(value)
  }),
  closingDay: z.string().nonempty({ message: 'Closing day is required' }),
  dueDay: z.string().nonempty({ message: 'Due day is required' }),
  account: z.string().nonempty({ message: 'Account is required' }),
})

export type AddEditCreditCardSchema = z.infer<typeof addEditCreditCardSchema>
