import { generateTasks } from '@/features/app/tasks'

export const tasksLoader = () => {
  const tasks = generateTasks(20)
  return { tasks }
}
