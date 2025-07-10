import { z } from 'zod'

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Min. 6 characters.')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Use upper, lower and number.'
      ),
    confirmPassword: z
      .string()
      .min(1, 'Confirm your password.')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  })

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
