import type { TaskSchema } from '@/features/app/tasks/lib/schemas'
import { tasksService } from '@/features/app/tasks/lib/services'
import { createEntityMutationHook } from '@/hooks/use-entity-mutation'
import { createEntityQueryHook } from '@/hooks/use-entity-query'

export const useTasks = createEntityQueryHook<TaskSchema>({
  queryKey: ['tasks'],
  service: tasksService,
  seedCount: 50,
  errorTitle: 'Failed to fetch tasks',
})

export const useCreateTask = createEntityMutationHook({
  mutationFn: tasksService.create,
  successToastMessage: 'task/task-add-success',
  errorToastMessage: 'task/task-add-error',
  invalidateQueryKey: ['tasks'],
})

export const useUpdateTask = createEntityMutationHook({
  mutationFn: tasksService.update,
  successToastMessage: 'task/task-update-success',
  errorToastMessage: 'task/task-update-error',
  invalidateQueryKey: ['tasks'],
})

export const useUpdateTasks = createEntityMutationHook({
  mutationFn: tasksService.bulkUpdate,
  successToastMessage: 'task/task-update-success',
  errorToastMessage: 'task/task-update-error',
  invalidateQueryKey: ['tasks'],
})

export const useDeleteTask = createEntityMutationHook({
  mutationFn: tasksService.delete,
  successToastMessage: 'task/task-delete-success',
  errorToastMessage: 'task/task-delete-error',
  invalidateQueryKey: ['tasks'],
})

export const useDeleteTasks = createEntityMutationHook({
  mutationFn: tasksService.bulkDelete,
  successToastMessage: 'task/task-delete-success',
  errorToastMessage: 'task/task-delete-error',
  invalidateQueryKey: ['tasks'],
})
