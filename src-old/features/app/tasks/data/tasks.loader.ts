import {
  generateTasks,
  getFacetedCounts,
  getRangeValues,
} from '@/features/app/tasks/data/tasks.utils'
import { type LoaderFunctionArgs } from 'react-router-dom'

export const tasksLoader = async (_: LoaderFunctionArgs) => {
  const tasks = generateTasks(20)
  const statusCounts = getFacetedCounts(tasks, 'status', ['todo', 'in progress', 'done'])
  const priorityCounts = getFacetedCounts(tasks, 'priority', ['low', 'medium', 'high'])
  const [min, max] = getRangeValues(tasks, 'estimatedHours')

  return {
    tasks,
    statusCounts,
    priorityCounts,
    estimatedHoursRange: { min, max },
  }
}
