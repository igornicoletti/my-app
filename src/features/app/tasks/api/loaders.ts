import type { LoaderFunctionArgs } from 'react-router-dom'

import {
  taskSchema,
  type TaskSchema
} from '@/features/app/tasks/api/schemas'
import {
  generateTasks,
  getFacetedCounts
} from '@/features/app/tasks/datatable/utils'

export type TaskLoaderData = {
  tasks: TaskSchema[]
  statusCounts: Record<TaskSchema['status'], number>
  priorityCounts: Record<TaskSchema['priority'], number>
}

export const taskLoader = async (_: LoaderFunctionArgs): Promise<TaskLoaderData> => {
  const tasks = generateTasks(50)

  const statusCounts = getFacetedCounts(tasks, 'status', taskSchema.shape.status.options)
  const priorityCounts = getFacetedCounts(tasks, 'priority', taskSchema.shape.priority.options)

  return {
    tasks,
    statusCounts,
    priorityCounts,
  }
}
