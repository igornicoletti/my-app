import { z } from 'zod'

export const roles = ['Admin', 'Manager', 'Editor'] as const
export const statuses = ['Active', 'Inactive', 'Pending'] as const

export const userSchema = z.object({
  id: z.string().min(1),
  name: z.string({
    required_error: 'Name is required.',
    invalid_type_error: 'Name must be a string.',
  }).trim().min(2, { message: 'Name must be at least 2 characters long.' }),
  email: z.string({
    required_error: 'Email is required.',
  }).email({ message: 'Invalid email address.' }),
  role: z.enum(roles, {
    required_error: 'Please select a role.',
    invalid_type_error: 'Invalid role.',
  }),
  status: z.enum(statuses, {
    required_error: 'Please select a status.',
    invalid_type_error: 'Invalid status.',
  }),
  lastLogin: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createUserSchema = z.object({
  name: userSchema.shape.name,
  email: userSchema.shape.email,
  role: userSchema.shape.role,
  status: userSchema.shape.status,
})

export const updateUserSchema = z.object({
  name: userSchema.shape.name.optional(),
  email: userSchema.shape.email.optional(),
  role: userSchema.shape.role.optional(),
  status: userSchema.shape.status.optional(),
})

export type UserSchema = z.infer<typeof userSchema>
export type CreateUserSchema = z.infer<typeof createUserSchema>
export type UpdateUserSchema = z.infer<typeof updateUserSchema>
