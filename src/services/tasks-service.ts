import type { CreateTaskSchema, TaskSchema, UpdateTaskSchema } from '@/features/app/tasks/lib/schemas'
import { generateRandomTask } from '@/features/app/tasks/lib/utils'

let tasks: TaskSchema[] = []

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const tasksService = {
  get: async (): Promise<TaskSchema[]> => {
    await delay(500)
    return [...tasks]
  },

  seed: async (count: number): Promise<TaskSchema[]> => {
    await delay(500)
    tasks = Array.from({ length: count }, () => generateRandomTask())
    return [...tasks]
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
    const taskIndex = tasks.findIndex((t) => t.id === input.id)

    if (taskIndex === -1) {
      throw new Error('Task not found')
    }

    const originalTask = tasks[taskIndex]
    const updatedTask: TaskSchema = {
      ...originalTask,
      ...input,
      updatedAt: new Date(),
    }

    tasks = tasks.map((task) => (task.id === input.id ? updatedTask : task))
    return updatedTask
  },

  bulkUpdate: async (
    input: { ids: string[] } & (
      | { status: TaskSchema['status'] }
      | { priority: TaskSchema['priority'] }
    ),
  ): Promise<TaskSchema[]> => {
    await delay(500)

    const { ids, ...updateData } = input
    const updatedTasks: TaskSchema[] = []

    tasks = tasks.map((task) => {
      if (ids.includes(task.id)) {
        const updatedTask = {
          ...task,
          ...updateData,
          updatedAt: new Date(),
        }
        updatedTasks.push(updatedTask)
        return updatedTask
      }
      return task
    })

    if (updatedTasks.length === 0) {
      throw new Error('No matching tasks found for bulk update')
    }

    return updatedTasks
  },

  delete: async (id: string): Promise<void> => {
    await delay(500)
    const taskIndex = tasks.findIndex((t) => t.id === id)

    if (taskIndex === -1) {
      throw new Error('Task not found')
    }

    tasks = tasks.filter((t) => t.id !== id)
  },

  bulkDelete: async (ids: string[]): Promise<void> => {
    await delay(500)
    tasks = tasks.filter((t) => !ids.includes(t.id))
  },
}
