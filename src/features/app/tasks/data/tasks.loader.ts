import { generateTasks } from '@/features/app/tasks'

export const tasksLoader = () => {
  const fakeTasks = generateTasks(20)
  return { tasks: fakeTasks }
}
