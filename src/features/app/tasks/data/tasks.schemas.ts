import { z } from 'zod'

import { labelsConfig, prioritiesConfig, statusesConfig } from '@/features/app/tasks'

export const statusEnum = z.enum(statusesConfig)
export const priorityEnum = z.enum(prioritiesConfig)
export const labelEnum = z.enum(labelsConfig)
export const tasksSchemas = z.object({
  status: statusEnum,
  priority: priorityEnum,
  label: labelEnum
})
