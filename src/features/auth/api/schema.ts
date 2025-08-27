import { z } from 'zod'

const confirmPasswordField = z.string()
  .trim()
  .min(1, 'Confirm your password.')

const displayNameField = z.string()
  .trim()
  .min(2, 'Display name must be at least 2 characters.')

const emailField = z.string()
  .trim()
  .min(1, 'Email is required.')
  .email('Enter a valid email.')

const passwordField = z.string()
  .trim()
  .min(1, 'Password is required.')

const strongPasswordField = z.string()
  .trim()
  .min(6, 'Min. 6 characters.')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Use upper, lower and number.')

const withConfirmPassword = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) =>
  schema.refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

export const forgotPasswordSchema = z.object({
  email: emailField,
})
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
})
export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = withConfirmPassword(z.object({
  displayName: displayNameField,
  email: emailField,
  password: strongPasswordField,
  confirmPassword: confirmPasswordField,
}))
export type RegisterSchema = z.infer<typeof registerSchema>

export const resetPasswordSchema = withConfirmPassword(z.object({
  password: strongPasswordField,
  confirmPassword: confirmPasswordField,
}))
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
