// service
import type {
  CreateTaskSchema,
  TaskSchema,
  UpdateTaskSchema
} from '@/features/app/tasks/lib/types'
import { generateRandomTask } from '@/features/app/tasks/lib/utils'

// O estado é mantido em memória para o mock
let tasks: TaskSchema[] = []

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const tasksService = {
  get: async (): Promise<TaskSchema[]> => {
    await delay(500)
    // Retorna uma cópia para evitar mutações externas do array em memória
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
      ...generateRandomTask(), // Gera dados base como id, code, etc.
      ...input,
      createdAt: new Date(),
    }
    // Adiciona a nova tarefa no início do array (imutabilidade)
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

    // Atualiza o array de forma imutável
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

    // Separa os IDs dos dados a serem atualizados para evitar espalhar `ids` no objeto da tarefa
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
      // Opcional: Lançar erro se nenhum ID corresponder, dependendo da regra de negócio.
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
    // Mantém apenas as tarefas cujo ID não está na lista de exclusão
    tasks = tasks.filter((t) => !ids.includes(t.id))
  },
}
