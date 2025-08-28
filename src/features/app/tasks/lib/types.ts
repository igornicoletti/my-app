import { z } from 'zod'

export const statuses = ['Todo', 'In progress', 'Done', 'Canceled'] as const
export const labels = ['Bug', 'Feature', 'Enhancement', 'Documentation'] as const
export const priorities = ['Low', 'Medium', 'High'] as const

export const taskSchema = z.object({
  id: z.string().min(1),
  code: z.string().min(1),
  title: z.string({
    required_error: 'Title is required.',
    invalid_type_error: 'Title must be a string.',
  }).trim().min(1, { message: 'Title cannot be empty.' }),
  estimatedHours: z.number({
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
  archived: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createTaskSchema = z.object({
  title: taskSchema.shape.title,
  estimatedHours: taskSchema.shape.estimatedHours,
  status: taskSchema.shape.status,
  label: taskSchema.shape.label,
  priority: taskSchema.shape.priority,
})

export const updateTaskSchema = z.object({
  title: taskSchema.shape.title.optional(),
  estimatedHours: taskSchema.shape.estimatedHours.optional(),
  status: taskSchema.shape.status.optional(),
  label: taskSchema.shape.label.optional(),
  priority: taskSchema.shape.priority.optional(),
  archived: taskSchema.shape.archived.optional(),
})

export type TaskSchema = z.infer<typeof taskSchema>
export type CreateTaskSchema = z.infer<typeof createTaskSchema>
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>
