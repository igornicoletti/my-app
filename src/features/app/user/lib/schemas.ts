import { z } from 'zod'

export const roles = {
  superadmin: 'Superadmin',
  manager: 'Manager',
  cashier: 'Cashier',
} as const

export const statuses = {
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
} as const

export type Role = typeof roles[keyof typeof roles]
export type Status = typeof statuses[keyof typeof statuses]

export const roleList: Role[] = Object.values(roles)
export const statusList: Status[] = Object.values(statuses)

export const userSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(2, { message: 'Name must be at least 2 characters long.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phone: z
    .string()
    .trim()
    .regex(/^\+\d{2} \(\d{2}\) \d{1} \d{4} \d{4}$/, {
      message: 'Phone must be in the format +XX (XX) X XXXX XXXX',
    }),
  role: z.enum(Object.values(roles) as [Role, ...Role[]]),
  status: z.enum(Object.values(statuses) as [Status, ...Status[]]),
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
