import { customAlphabet } from 'nanoid'

import type { CreateTaskSchema, TaskSchema, UpdateTaskSchema } from '@/features/app/tasks/lib/schema'
import { generateRandomTasks } from '@/features/app/tasks/lib/utils'

let tasksStore: TaskSchema[] = []

const ensureDataSeeded = () => {
  if (tasksStore.length === 0) {
    console.log('Seeding initial data...')
    tasksStore = generateRandomTasks(50)
  }
}

ensureDataSeeded()

export const getTasks = async (): Promise<TaskSchema[]> => {
  return tasksStore
}

export const createTask = async (input: CreateTaskSchema) => {
  try {
    const nanoid = customAlphabet('0123456789', 4)

    const newTask: TaskSchema = {
      id: crypto.randomUUID(),
      code: `TASK-${nanoid()}`,
      archived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...input,
    }

    tasksStore.unshift(newTask)

    return { data: newTask, error: null }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return { data: null, error: message }
  }
}

export const updateTask = async (input: UpdateTaskSchema & { id: string }) => {
  try {
    const index = tasksStore.findIndex(t => t.id === input.id)
    if (index === -1) {
      return { data: null, error: 'Task not found' }
    }

    tasksStore[index] = { ...tasksStore[index], ...input, updatedAt: new Date() }

    return { data: tasksStore[index], error: null }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return { data: null, error: message }
  }
}

export const updateTasks = async (input: {
  ids: string[]
  label?: TaskSchema['label']
  status?: TaskSchema['status']
  priority?: TaskSchema['priority']
}) => {
  try {
    tasksStore = tasksStore.map(task => {
      if (!input.ids.includes(task.id)) return task

      return {
        ...task,
        label: input.label ?? task.label,
        status: input.status ?? task.status,
        priority: input.priority ?? task.priority,
        updatedAt: new Date(),
      }
    })
    return { data: { success: true }, error: null }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return { data: null, error: message }
  }
}

export const deleteTask = async (input: { id: string }) => {
  try {
    const initialLength = tasksStore.length
    tasksStore = tasksStore.filter(task => task.id !== input.id)

    if (tasksStore.length === initialLength) {
      return { data: null, error: "Task not found to delete." }
    }

    return { data: { success: true }, error: null }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return { data: null, error: message }
  }
}

export const deleteTasks = async (input: { ids: string[] }) => {
  try {
    tasksStore = tasksStore.filter(task => !input.ids.includes(task.id))
    return { data: { success: true }, error: null }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return { data: null, error: message }
  }
}
