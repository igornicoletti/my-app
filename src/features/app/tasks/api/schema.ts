import { z } from 'zod'

export const taskSchema = z.object({
  id: z.string(),
  code: z.string(),
  title: z.string(),
  estimatedHours: z.number(),
  status: z.enum(['todo', 'in progress', 'done']),
  label: z.enum(['bug', 'feature', 'documentation']).optional(),
  priority: z.enum(['low', 'medium', 'high']),
  archived: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type TaskSchema = z.infer<typeof taskSchema>

export const tasks = {
  status: {
    enumValues: taskSchema.shape.status.options,
  },
  label: {
    enumValues: taskSchema.shape.label.unwrap().options,
  },
  priority: {
    enumValues: taskSchema.shape.priority.options,
  },
}
