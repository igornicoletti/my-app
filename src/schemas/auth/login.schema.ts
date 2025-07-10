import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required.')
    .email('Enter a valid email.'),
  password: z
    .string()
    .min(1, 'Password is required.')
})

export type LoginSchema = z.infer<typeof loginSchema>
