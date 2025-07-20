import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.enum(['admin', 'member']),
  status: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
})

export type UserSchema = z.infer<typeof userSchema>
