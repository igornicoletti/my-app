import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import type { TaskSchema } from '@/features/app/tasks/lib/types'
import { useToast } from '@/hooks/useToast'
import { tasksService } from '@/services/tasksService'

export const useTasks = () => {
  const { errorToast } = useToast()

  const queryResult = useQuery<TaskSchema[], Error>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const tasks = await tasksService.get()
      if (tasks.length === 0) {
        return await tasksService.seed(50)
      }
      return tasks
    },
    initialData: [],
  })

  useEffect(() => {
    if (queryResult.isError) {
      const errorMessage = queryResult.error?.message || 'Unknown error occurred'
      console.error('Failed to fetch tasks:', errorMessage)
      errorToast('Failed to fetch tasks')
    }
  }, [queryResult.isError, queryResult.error])

  return queryResult
}
