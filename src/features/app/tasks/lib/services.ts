import { generateRandomTask } from '@/features/app/tasks/lib/generate'
import type { TaskSchema } from '@/features/app/tasks/lib/schemas'
import { createEntityService } from '@/services/entity-service'

export const tasksService = createEntityService<TaskSchema>('Task', generateRandomTask)
