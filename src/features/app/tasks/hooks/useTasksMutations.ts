import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToast } from '@/hooks'
import { tasksService } from '@/services'

export const useCreateTask = (options?: { onSuccess?: (data: any) => void }) => {
  const { errorToast, successToast } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: tasksService.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      successToast('task/task-add-success')
      options?.onSuccess?.(data)
    },
    onError: () => {
      errorToast('task/task-add-error')
    },
  })
}

export const useUpdateTask = (options?: { onSuccess?: (data: any) => void }) => {
  const { errorToast, successToast } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: tasksService.update,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      successToast('task/task-update-success')
      options?.onSuccess?.(data)
    },
    onError: () => {
      errorToast('task/task-update-error')
    },
  })
}

export const useUpdateTasks = (options?: { onSuccess?: (data: any) => void }) => {
  const { errorToast, successToast } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: tasksService.bulkUpdate,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      successToast('task/task-update-success')
      options?.onSuccess?.(data)
    },
    onError: () => {
      errorToast('task/task-update-error')
    },
  })
}

export const useDeleteTask = (options?: { onSuccess?: (data: any) => void }) => {
  const { errorToast, successToast } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: tasksService.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      successToast('task/task-delete-success')
      options?.onSuccess?.(data)
    },
    onError: () => {
      errorToast('task/task-delete-error')
    },
  })
}

export const useDeleteTasks = (options?: { onSuccess?: (data: any) => void }) => {
  const { errorToast, successToast } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: tasksService.bulkDelete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      successToast('task/task-delete-success')
      options?.onSuccess?.(data)
    },
    onError: () => {
      errorToast('task/task-delete-error')
    },
  })
}
