import { z } from 'zod'

export const statuses = ['Todo', 'In progress', 'Done', 'Canceled'] as const
export const labels = ['Bug', 'Feature', 'Enhancement', 'Documentation'] as const
export const priorities = ['Low', 'Medium', 'High'] as const

export const taskSchema = z.object({
  id: z.string(),
  code: z.string(),
  title: z.string({
    required_error: 'Title is required.',
    invalid_type_error: 'Title must be a string.',
  }).trim().min(1, { message: 'Title cannot be empty.' }),

  estimatedHours: z.coerce.number({
    required_error: 'Estimated hours are required.',
    invalid_type_error: 'Estimated hours must be a number.',
  }).min(0, { message: 'Estimated hours must be greater than or equal to 0.' }),

  status: z.enum(statuses, {
    required_error: 'Please select a status.',
    invalid_type_error: 'Invalid status.',
  }),

  label: z.enum(labels, {
    required_error: 'Please select a label.',
    invalid_type_error: 'Invalid label.',
  }),

  priority: z.enum(priorities, {
    required_error: 'Please select a priority.',
    invalid_type_error: 'Invalid priority.',
  }),

  archived: z.coerce.boolean(),
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
