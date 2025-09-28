import { taskGenerate } from '@/features/app/task/lib/generate'
import { taskSchemaCreate, taskSchemaUpdate, type TaskSchema } from '@/features/app/task/lib/schema'
import { createEntityMutationHook } from '@/hooks/use-entity-mutation'
import { createEntityQueryHook } from '@/hooks/use-entity-query'
import { ServiceEntity } from '@/services/entity'

export const tasks = ServiceEntity<TaskSchema, typeof taskSchemaCreate._input, typeof taskSchemaUpdate._input>(
  'Task',
  taskGenerate,
  taskSchemaCreate,
  taskSchemaUpdate
)

export const useTask = createEntityQueryHook<TaskSchema>({
  queryKey: ['tasks'],
  service: tasks,
  seedCount: 50,
  errorTitle: 'task/fetch-error',
})

export const useTaskCreate = createEntityMutationHook({
  mutationFn: tasks.create,
  successToastMessage: 'task/task-add-success',
  errorToastMessage: 'task/task-add-error',
  invalidateQueryKey: ['tasks'],
})

export const useTaskUpdate = createEntityMutationHook({
  mutationFn: tasks.update,
  successToastMessage: 'task/task-update-success',
  errorToastMessage: 'task/task-update-error',
  invalidateQueryKey: ['tasks'],
})

export const useTaskUpdates = createEntityMutationHook({
  mutationFn: tasks.bulkUpdate,
  successToastMessage: 'task/task-update-success',
  errorToastMessage: 'task/task-update-error',
  invalidateQueryKey: ['tasks'],
})

export const useTaskDelete = createEntityMutationHook({
  mutationFn: tasks.bulkDelete,
  successToastMessage: 'task/task-delete-success',
  errorToastMessage: 'task/task-delete-error',
  invalidateQueryKey: ['tasks'],
})
