import { InstitutionTypeEnum } from 'api/accounts/accounts.types'
import { z } from 'zod'

export const addEditAccountSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  institution: z.coerce.string().refine((value) => {
    return Object.keys(InstitutionTypeEnum).includes(value)
  }),
  balance: z.coerce.number().min(0, { message: 'Balance must be zero or greater' }),
})

export type AddEditAccountSchema = z.infer<typeof addEditAccountSchema>
