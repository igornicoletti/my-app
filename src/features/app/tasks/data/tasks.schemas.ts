import { LABELS, PRIORITIES, STATUSES } from '@/features/app/tasks'
import { z } from 'zod'

export const statusEnum = z.enum(STATUSES)
export const priorityEnum = z.enum(PRIORITIES)
export const labelEnum = z.enum(LABELS)
export const tasksSchemas = z.object({
  status: statusEnum,
  priority: priorityEnum,
  label: labelEnum
})
