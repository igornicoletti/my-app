import type { z } from 'zod'

import type {
  forgotPasswordSchema,
  heroData,
  loginSchema,
  registerSchema,
  resetPasswordSchema
} from '@/features/auth'

export type ForgotPasswordProps = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordProps = z.infer<typeof resetPasswordSchema>
export type RegisterProps = z.infer<typeof registerSchema>
export type LoginProps = z.infer<typeof loginSchema>

export type HeroKey = keyof typeof heroData

export type HeroProps = {
  heading: string
  subheading: string
  question: string
  linkLabel: string
  linkTo: string
}
