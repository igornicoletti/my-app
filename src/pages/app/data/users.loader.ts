import type { Task } from '@/components'

export const usersLoader = async (): Promise<Task[]> => {
  const res = await fetch('http://localhost:3001/tasks')
  if (!res.ok) throw new Error('Failed to load tasks')
  return await res.json()
}
