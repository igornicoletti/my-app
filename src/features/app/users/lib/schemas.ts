import { z } from 'zod'

export const roles = ['Superadmin', 'Manager', 'Cashier'] as const
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
  phone: z.string({
    required_error: 'Phone is required.',
    invalid_type_error: 'Phone must be a string.',
  }).trim().regex(/^\+\d{2} \(\d{2}\) \d{1} \d{4} \d{4}$/, {
    message: 'Phone must be in the format +XX (XX) X XXXX XXXX',
  }),
  role: z.enum(roles, {
    required_error: 'Please select a role.',
    invalid_type_error: 'Invalid role.',
  }),
  status: z.enum(statuses, {
    required_error: 'Please select a status.',
    invalid_type_error: 'Invalid status.',
  }),
  createdAt: z.date(),
  lastLogin: z.date().optional(),
  updatedAt: z.date(),
})

export const createUserSchema = z.object({
  name: userSchema.shape.name,
  email: userSchema.shape.email,
  phone: userSchema.shape.phone,
  role: userSchema.shape.role,
  status: userSchema.shape.status,
})

export const updateUserSchema = z.object({
  name: userSchema.shape.name.optional(),
  email: userSchema.shape.email.optional(),
  phone: userSchema.shape.phone.optional(),
  role: userSchema.shape.role.optional(),
  status: userSchema.shape.status.optional(),
})

export type UserSchema = z.infer<typeof userSchema>
export type CreateUserSchema = z.infer<typeof createUserSchema>
export type UpdateUserSchema = z.infer<typeof updateUserSchema>
