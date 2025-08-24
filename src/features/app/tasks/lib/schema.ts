import { z } from 'zod'

export const statuses = ['todo', 'in progress', 'done', 'canceled'] as const
export const labels = ['bug', 'feature', 'enhancement', 'documentation'] as const
export const priorities = ['low', 'medium', 'high'] as const

export const taskSchema = z.object({
  id: z.string(),
  code: z.string(),
  title: z.string(),
  estimatedHours: z.coerce.number().min(0),
  status: z.enum(statuses),
  label: z.enum(labels),
  priority: z.enum(priorities),
  archived: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createTaskSchema = taskSchema.omit({
  id: true,
  code: true,
  createdAt: true,
  updatedAt: true,
  archived: true,
})

export const updateTaskSchema = taskSchema.partial()

export type TaskSchema = z.infer<typeof taskSchema>
export type CreateTaskSchema = z.infer<typeof createTaskSchema>
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>
