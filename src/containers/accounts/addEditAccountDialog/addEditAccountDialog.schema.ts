import { z } from 'zod'

export const addEditAccountSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  balance: z.coerce.number().min(0, { message: 'Balance must be zero or greater' }),
})

export type AddEditAccountSchema = z.infer<typeof addEditAccountSchema>
