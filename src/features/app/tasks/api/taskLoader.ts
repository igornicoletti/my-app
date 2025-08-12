import {
  generateTasks,
  getFacetedCounts,
} from '@/features/app/tasks/datatable/taskUtils'
import { type LoaderFunctionArgs } from 'react-router-dom'

export const taskLoader = async (_: LoaderFunctionArgs) => {
  const tasks = generateTasks(50)
  const statusCounts = getFacetedCounts(tasks, 'status', ['todo', 'in progress', 'done'])
  const priorityCounts = getFacetedCounts(tasks, 'priority', ['low', 'medium', 'high'])

  return {
    tasks,
    statusCounts,
    priorityCounts,
  }
}
