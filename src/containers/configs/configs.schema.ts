import { z } from 'zod'

export const configsSchema = z.object({
  auto_mark_as_paid: z.boolean().optional(),
})

export type ConfigsSchema = z.infer<typeof configsSchema>
