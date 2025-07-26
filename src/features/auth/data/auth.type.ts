import type { z } from 'zod'

import type {
  authData,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema
} from '@/features/auth'

export type ForgotPasswordProps = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordProps = z.infer<typeof resetPasswordSchema>
export type RegisterProps = z.infer<typeof registerSchema>
export type LoginProps = z.infer<typeof loginSchema>
export type AuthKey = keyof typeof authData
export type AuthProps = {
  heading: string
  subheading: string
  question: string
  linkLabel: string
  linkTo: string
}
