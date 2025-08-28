import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { taskService } from '@/services/taskService'

export const useCreateTask = (options?: { onSuccess?: (data: any) => void }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: taskService.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Task created')
      options?.onSuccess?.(data)
    },
    onError: () => {
      toast.error('Failed to create task')
    },
  })
}

export const useUpdateTask = (options?: { onSuccess?: (data: any) => void }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: taskService.update,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success(`Task '${data.title}' updated`)
      options?.onSuccess?.(data)
    },
    onError: () => {
      toast.error('Failed to update task')
    },
  })
}

export const useUpdateTasks = (options?: { onSuccess?: (data: any) => void }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: taskService.bulkUpdate,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success(`${data.length} tasks updated`)
      options?.onSuccess?.(data)
    },
    onError: () => {
      toast.error('Failed to update tasks')
    },
  })
}

export const useDeleteTask = (options?: { onSuccess?: (data: any) => void }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: taskService.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Task deleted')
      options?.onSuccess?.(data)
    },
    onError: () => {
      toast.error('Failed to delete task')
    },
  })
}

export const useDeleteTasks = (options?: { onSuccess?: (data: any) => void }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: taskService.bulkDelete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Tasks deleted')
      options?.onSuccess?.(data)
    },
    onError: () => {
      toast.error('Failed to delete tasks')
    },
  })
}
