import { z } from 'zod'

// --- Definições de Enums (Constantes) ---

export const roles = {
  superadmin: 'Superadmin',
  manager: 'Manager',
  viewer: 'Viewer',
} as const

export const statuses = {
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
} as const

// --- Tipos e Listas Derivados ---

export type Role = typeof roles[keyof typeof roles]
export type Status = typeof statuses[keyof typeof statuses]

export const roleList = Object.values(roles)
export const statusList = Object.values(statuses)

// --- Schemas Base (CRUD Base) ---

export const userSchema = z.object({
  // Identificação e Contato
  id: z.string().min(1),
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters long.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phone: z
    .string()
    .trim()
    .regex(/^\+\d{2} \(\d{2}\) \d{1} \d{4} \d{4}$/, {
      message: 'Phone must be in the format +XX (XX) X XXXX XXXX',
    }),

  // Enums
  role: z.enum(roleList as [Role, ...Role[]]),
  status: z.enum(statusList as [Status, ...Status[]]),

  // Datas
  createdAt: z.date(),
  lastLogin: z.date().optional(),
  updatedAt: z.date(),
})

// --- Schemas Específicos (Create / Update) ---

// User para criação (exclui id e datas)
export const userSchemaCreate = z.object({
  name: userSchema.shape.name,
  email: userSchema.shape.email,
  phone: userSchema.shape.phone,
  role: userSchema.shape.role,
  status: userSchema.shape.status,
})

// User para atualização (todos os campos principais são opcionais)
export const userSchemaUpdate = z.object({
  name: userSchema.shape.name.optional(),
  email: userSchema.shape.email.optional(),
  phone: userSchema.shape.phone.optional(),
  role: userSchema.shape.role.optional(),
  status: userSchema.shape.status.optional(),
})

// --- Tipos Inferidos ---

export type UserSchema = z.infer<typeof userSchema>
export type UserSchemaCreate = z.infer<typeof userSchemaCreate>
export type UserSchemaUpdate = z.infer<typeof userSchemaUpdate>
