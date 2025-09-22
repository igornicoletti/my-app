import { generateRandomTask } from '@/features/app/tasks/lib/generate'
import { createTaskSchema, updateTaskSchema, type TaskSchema } from '@/features/app/tasks/lib/schemas'
import { createEntityMutationHook } from '@/hooks/use-entity-mutation'
import { createEntityQueryHook } from '@/hooks/use-entity-query'
import { ServiceEntity } from '@/services/entity'

export const tasks = ServiceEntity<TaskSchema, typeof createTaskSchema._input, typeof updateTaskSchema._input>(
  'Task',
  generateRandomTask,
  createTaskSchema,
  updateTaskSchema
)

export const useTasks = createEntityQueryHook<TaskSchema>({
  queryKey: ['tasks'],
  service: tasks,
  seedCount: 50,
  errorTitle: 'task/fetch-error',
})

export const useCreateTask = createEntityMutationHook({
  mutationFn: tasks.create,
  successToastMessage: 'task/task-add-success',
  errorToastMessage: 'task/task-add-error',
  invalidateQueryKey: ['tasks'],
})

export const useUpdateTask = createEntityMutationHook({
  mutationFn: tasks.update,
  successToastMessage: 'task/task-update-success',
  errorToastMessage: 'task/task-update-error',
  invalidateQueryKey: ['tasks'],
})

export const useUpdateTasks = createEntityMutationHook({
  mutationFn: tasks.bulkUpdate,
  successToastMessage: 'task/task-update-success',
  errorToastMessage: 'task/task-update-error',
  invalidateQueryKey: ['tasks'],
})

export const useDeleteTask = createEntityMutationHook({
  mutationFn: tasks.delete,
  successToastMessage: 'task/task-delete-success',
  errorToastMessage: 'task/task-delete-error',
  invalidateQueryKey: ['tasks'],
})

export const useDeleteTasks = createEntityMutationHook({
  mutationFn: tasks.bulkDelete,
  successToastMessage: 'task/task-delete-success',
  errorToastMessage: 'task/task-delete-error',
  invalidateQueryKey: ['tasks'],
})
