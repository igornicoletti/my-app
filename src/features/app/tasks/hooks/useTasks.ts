import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { taskService } from '@/services/taskService'

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      try {
        const tasks = await taskService.get()
        if (tasks.length === 0) {
          return await taskService.seed(50)
        }
        return tasks
      } catch (error) {
        toast.error('Failed to fetch tasks')
        return []
      }
    },
  })
}
