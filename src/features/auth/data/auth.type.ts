import type { z } from 'zod'

import type {
  authConfig,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema
} from '@/features/auth/data'

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
export type RegisterSchema = z.infer<typeof registerSchema>
export type LoginSchema = z.infer<typeof loginSchema>
export type AuthKey = keyof typeof authConfig
export type Auth = {
  heading: string
  subheading: string
  question: string
  linkLabel: string
  linkTo: string
}
