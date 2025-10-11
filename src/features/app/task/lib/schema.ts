import { z } from 'zod'

// --- Definições de Enums (Constantes) ---

export const statuses = {
  todo: 'Todo',
  inProgress: 'In progress',
  done: 'Done',
  canceled: 'Canceled',
} as const

export const labels = {
  bug: 'Bug',
  documentation: 'Documentation',
  enhancement: 'Enhancement',
  feature: 'Feature',
} as const

export const priorities = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
} as const

// --- Tipos e Listas Derivados ---

export type Status = typeof statuses[keyof typeof statuses]
export type Label = typeof labels[keyof typeof labels]
export type Priority = typeof priorities[keyof typeof priorities]

// Usamos `as const` nas definições, então Zod infere corretamente
// o tipo tupla necessário para `z.enum`.
export const statusList = Object.values(statuses)
export const labelList = Object.values(labels)
export const priorityList = Object.values(priorities)

// --- Schemas Base (CRUD Base) ---

export const taskSchema = z.object({
  // Identificação e Metadados
  id: z.string().min(1),
  code: z.string().min(1),

  // Campos Principais
  title: z
    .string()
    .trim()
    .min(1, { message: 'Title cannot be empty.' }),
  estimatedHours: z
    .number()
    .min(1, { message: 'Estimated hours must be >= 1.' }),

  // Enums
  status: z.enum(statusList as [Status, ...Status[]]),
  label: z.enum(labelList as [Label, ...Label[]]),
  priority: z.enum(priorityList as [Priority, ...Priority[]]),

  // Flags e Datas
  archived: z.boolean().default(false),
  createdAt: z
    .date()
    .max(new Date(), { message: 'Created date cannot be in the future.' }),
  updatedAt: z
    .date()
    .max(new Date(), { message: 'Updated date cannot be in the future.' }),
})

// --- Schemas Específicos (Create / Update) ---

// Task para criação (exclui id, code e datas, mantém campos principais obrigatórios)
export const taskSchemaCreate = z.object({
  title: taskSchema.shape.title,
  estimatedHours: taskSchema.shape.estimatedHours,
  status: taskSchema.shape.status,
  label: taskSchema.shape.label,
  priority: taskSchema.shape.priority,
  archived: taskSchema.shape.archived.optional(),
})

// Task para atualização (todos os campos principais são opcionais)
export const taskSchemaUpdate = z.object({
  title: taskSchema.shape.title.optional(),
  estimatedHours: taskSchema.shape.estimatedHours.optional(),
  status: taskSchema.shape.status.optional(),
  label: taskSchema.shape.label.optional(),
  priority: taskSchema.shape.priority.optional(),
  archived: taskSchema.shape.archived.optional(),
})

// --- Tipos Inferidos ---

export type TaskSchema = z.infer<typeof taskSchema>
export type TaskSchemaCreate = z.infer<typeof taskSchemaCreate>
export type TaskSchemaUpdate = z.infer<typeof taskSchemaUpdate>
