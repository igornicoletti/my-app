import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  roles: z.enum(['admin', 'owner', 'viewer']),
  status: z.enum(['active', 'inactive', 'suspended']),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type UserSchema = z.infer<typeof userSchema>
