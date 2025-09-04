import { useMutation, useQueryClient, type MutationFunction } from '@tanstack/react-query'

import { useToast } from '@/hooks/use-toast'
import { tasksService } from '@/services/tasks-service'

type TaskMutationOptions<TData, TVariables> = {
  onSuccess?: (data: TData, variables: TVariables, context: unknown) => void
}

interface CreateTaskMutationParams<TData, TVariables> {
  mutationFn: MutationFunction<TData, TVariables>
  successToastMessage: string
  errorToastMessage: string
  invalidateQueryKey?: string[]
}

const createTaskMutation = <TData = unknown, TVariables = void>({
  mutationFn,
  successToastMessage,
  errorToastMessage,
  invalidateQueryKey = ['tasks'],
}: CreateTaskMutationParams<TData, TVariables>) => {
  return (options?: TaskMutationOptions<TData, TVariables>) => {
    const { successToast, errorToast } = useToast()
    const queryClient = useQueryClient()

    return useMutation<TData, Error, TVariables>({
      mutationFn,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({ queryKey: invalidateQueryKey })
        successToast(successToastMessage)
        options?.onSuccess?.(data, variables, context)
      },
      onError: (error) => {
        console.error(error.message)
        errorToast(errorToastMessage)
      },
    })
  }
}

export const useCreateTask = createTaskMutation({
  mutationFn: tasksService.create,
  successToastMessage: 'task/task-add-success',
  errorToastMessage: 'task/task-add-error',
})

export const useUpdateTask = createTaskMutation({
  mutationFn: tasksService.update,
  successToastMessage: 'task/task-update-success',
  errorToastMessage: 'task/task-update-error',
})

export const useUpdateTasks = createTaskMutation({
  mutationFn: tasksService.bulkUpdate,
  successToastMessage: 'task/task-update-success',
  errorToastMessage: 'task/task-update-error',
})

export const useDeleteTask = createTaskMutation({
  mutationFn: tasksService.delete,
  successToastMessage: 'task/task-delete-success',
  errorToastMessage: 'task/task-delete-error',
})

export const useDeleteTasks = createTaskMutation({
  mutationFn: tasksService.bulkDelete,
  successToastMessage: 'task/task-delete-success',
  errorToastMessage: 'task/task-delete-error',
})
