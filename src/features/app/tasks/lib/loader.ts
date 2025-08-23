import type { LoaderFunctionArgs } from 'react-router-dom'

import { generateRandomTasks } from '@/features/app/tasks/lib/faker'
import { type TaskSchema, priorities, statuses, } from '@/features/app/tasks/lib/schema'
import { getFacetedCounts, getRangeValues } from '@/features/app/tasks/lib/utils'

export type TaskLoaderData = {
  tasks: TaskSchema[]
  statusCounts: Record<(typeof statuses)[number], number>
  priorityCounts: Record<(typeof priorities)[number], number>
  estimatedHoursRange: [number, number]
}

export const taskLoader = async (_: LoaderFunctionArgs): Promise<TaskLoaderData> => {
  const tasks = generateRandomTasks(50)
  const statusCounts = getFacetedCounts(tasks, 'status', statuses)
  const priorityCounts = getFacetedCounts(tasks, 'priority', priorities)
  const [min, max] = getRangeValues(tasks, 'estimatedHours')
  const estimatedHoursRange: [number, number] = tasks.length === 0 ? [0, 24] : [min, max]

  return {
    tasks,
    statusCounts,
    priorityCounts,
    estimatedHoursRange,
  }
}
