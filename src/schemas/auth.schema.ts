import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required.').email('Enter a valid email.'),
  password: z.string().min(1, 'Password is required.')
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  email: z.string().trim().min(1, 'Email is required.').email('Enter a valid email.'),
  password: z.string()
    .min(6, 'Min. 6 characters.')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Use upper, lower and number.'),
  confirmPassword: z.string().min(1, 'Confirm your password.'),
  displayName: z.string().trim().min(2, 'Min. 2 characters.').optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match.',
  path: ['confirmPassword']
})

export type RegisterSchema = z.infer<typeof registerSchema>

export const forgotPasswordSchema = z.object({
  email: z.string().trim().min(1, 'Email is required.').email('Enter a valid email.')
})

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z.object({
  password: z.string()
    .min(6, 'Min. 6 characters.')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Use upper, lower and number.'),
  confirmPassword: z.string().min(1, 'Confirm your password.')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match.',
  path: ['confirmPassword']
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
