import { z } from 'zod'

const displayNameField = z.string().trim().min(2, 'Min. 2 characters.')
const emailField = z.string().trim().min(1, 'Email is required.').email('Enter a valid email.')
const passwordField = z.string().min(1, 'Password is required.')
const strongPasswordField = z.string().min(6, 'Min. 6 characters.').regex(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
  'Use upper, lower and number.'
)
const confirmPasswordField = z.string().min(1, 'Confirm your password.')

export const loginSchema = z.object({
  email: emailField,
  password: passwordField
})

export const forgotPasswordSchema = z.object({
  email: emailField
})

export const registerSchema = z
  .object({
    email: emailField,
    password: strongPasswordField,
    confirmPassword: confirmPasswordField,
    displayName: displayNameField
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  })

export const resetPasswordSchema = z
  .object({
    password: strongPasswordField,
    confirmPassword: confirmPasswordField
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  })
