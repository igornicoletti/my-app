import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { tasksService } from '@/services/tasksService'

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      try {
        const tasks = await tasksService.get()
        if (tasks.length === 0) {
          return await tasksService.seed(25)
        }
        return tasks
      } catch (error) {
        toast.error('Failed to fetch tasks')
        return []
      }
    },
  })
}
