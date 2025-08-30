import type {
  CreateTaskSchema,
  TaskSchema,
  UpdateTaskSchema
} from '@/features/app/tasks/lib/types'
import { generateRandomTask } from '@/features/app/tasks/lib/utils'

let tasks: TaskSchema[] = []

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const tasksService = {
  get: async (): Promise<TaskSchema[]> => {
    await delay(500)
    return tasks
  },

  seed: async (count: number): Promise<TaskSchema[]> => {
    await delay(500)
    const seeded = Array.from({
      length: count
    }, () => generateRandomTask())
    tasks = seeded
    return tasks
  },

  create: async (input: CreateTaskSchema): Promise<TaskSchema> => {
    await delay(500)
    const newTask: TaskSchema = {
      ...generateRandomTask(),
      ...input,
      createdAt: new Date(),
    }
    tasks = [newTask, ...tasks]
    return newTask
  },

  update: async (input: UpdateTaskSchema & { id: string }): Promise<TaskSchema> => {
    await delay(500)
    const index = tasks.findIndex((t) => t.id === input.id)
    if (index === -1) {
      throw new Error('Task not found')
    }
    const updated: TaskSchema = {
      ...tasks[index],
      ...input,
      updatedAt: new Date(),
    }
    tasks[index] = updated
    return updated
  },

  bulkUpdate: async (
    input: { ids: string[] } & (
      | { status: TaskSchema['status'] }
      | { priority: TaskSchema['priority'] }
    ),
  ): Promise<TaskSchema[]> => {
    await delay(500)
    const updatedTasks: TaskSchema[] = []
    tasks = tasks.map((t) => {
      if (input.ids.includes(t.id)) {
        const updated = {
          ...t,
          ...input,
          updatedAt: new Date()
        }
        updatedTasks.push(updated)
        return updated
      }
      return t
    })
    return updatedTasks
  },

  delete: async (id: string): Promise<void> => {
    await delay(500)
    const originalLength = tasks.length
    tasks = tasks.filter((t) => t.id !== id)
    if (tasks.length === originalLength) {
      throw new Error('Task not found')
    }
  },

  bulkDelete: async (ids: string[]): Promise<void> => {
    await delay(500)
    tasks = tasks.filter((t) => !ids.includes(t.id))
  },
}
