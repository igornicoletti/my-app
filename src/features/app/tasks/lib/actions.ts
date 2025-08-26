import type { CreateTaskSchema, TaskSchema, UpdateTaskSchema } from '@/features/app/tasks/lib/schema'
import { generateRandomTask } from '@/features/app/tasks/lib/utils'

let tasks: TaskSchema[] = []

export const seedTasks = (input: { count?: number }) => {
  const count = input.count ?? 100
  tasks = Array.from({ length: count }, () => generateRandomTask())
  return tasks
}

export const getAllTasks = () => [...tasks]

export const setAllTasks = (newTasks: TaskSchema[]) => {
  tasks = [...newTasks]
}

export const createTask = async (input: CreateTaskSchema) => {
  const tasks = getAllTasks()
  const newTask: TaskSchema = { ...generateRandomTask(), ...input }
  tasks.push(newTask)
  setAllTasks(tasks)
  return { data: newTask, error: null }
}

export const updateTask = async (input: UpdateTaskSchema & { id: string }) => {
  const tasks = getAllTasks()
  const index = tasks.findIndex((task) => task.id === input.id)
  if (index === -1) return { data: null, error: 'Task not found' }

  tasks[index] = { ...tasks[index], ...input, updatedAt: new Date() }
  setAllTasks(tasks)
  return { data: tasks[index], error: null }
}

export const updateTasks = async (input: {
  ids: string[]
  label?: TaskSchema['label']
  status?: TaskSchema['status']
  priority?: TaskSchema['priority']
}) => {
  const tasks = getAllTasks()
  const updated: TaskSchema[] = []

  tasks.forEach((t, i) => {
    if (input.ids.includes(t.id)) {
      tasks[i] = { ...t, ...input, updatedAt: new Date() }
      updated.push(tasks[i])
    }
  })

  setAllTasks(tasks)
  return { data: updated, error: null }
}

export const deleteTask = async (input: { id: string }) => {
  let tasks = getAllTasks()
  tasks = tasks.filter(t => t.id !== input.id)
  tasks.push(generateRandomTask())
  setAllTasks(tasks)
  return { data: null, error: null }
}

export const deleteTasks = async (input: { ids: string[] }) => {
  let tasks = getAllTasks()
  tasks = tasks.filter(t => !input.ids.includes(t.id))
  tasks.push(...input.ids.map(() => generateRandomTask()))
  setAllTasks(tasks)
  return { data: null, error: null }
}
