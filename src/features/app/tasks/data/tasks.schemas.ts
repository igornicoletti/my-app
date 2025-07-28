import { z } from 'zod'

export const tasksSchemas = z.object({
  status: z.enum(['todo', 'in-progress', 'done', 'canceled']),
  priority: z.enum(['low', 'medium', 'high']),
  label: z.enum(['frontend', 'backend', 'design', 'research']),
})
