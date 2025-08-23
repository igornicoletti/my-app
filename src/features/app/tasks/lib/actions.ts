import { customAlphabet } from 'nanoid'

import { generateRandomTasks } from '@/features/app/tasks/lib/faker'
import type { CreateTaskSchema, TaskSchema, UpdateTaskSchema } from '@/features/app/tasks/lib/schema'

let tasksStore: TaskSchema[] = []

export const seedTasks = async (input: { count?: number }): Promise<TaskSchema[]> => {
  const count = input.count ?? 25
  const allTasks = generateRandomTasks(count)
  tasksStore = allTasks
  return allTasks
}

export const createTask = async (input: CreateTaskSchema) => {
  try {
    const nanoid = customAlphabet('0123456789', 4)

    const newTask: TaskSchema = {
      id: crypto.randomUUID(),
      code: `TASK-${nanoid()}`,
      title: input.title,
      estimatedHours: input.estimatedHours,
      status: input.status,
      label: input.label,
      priority: input.priority,
      archived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    tasksStore.unshift(newTask)

    return {
      data: newTask,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : String(err),
    }
  }
}

export const updateTask = async (input: UpdateTaskSchema & { id: string }) => {
  try {
    const index = tasksStore.findIndex(t => t.id === input.id)
    if (index === -1) {
      return { data: null, error: 'Task not found' }
    }

    const oldTask = tasksStore[index]

    const updatedTask: TaskSchema = {
      ...oldTask,
      title: input.title ?? oldTask.title,
      label: input.label ?? oldTask.label,
      status: input.status ?? oldTask.status,
      priority: input.priority ?? oldTask.priority,
      updatedAt: new Date(),
    }

    tasksStore[index] = updatedTask

    const changedStatus = oldTask.status !== updatedTask.status
    const changedPriority = oldTask.priority !== updatedTask.priority

    return {
      data: {
        statusChanged: changedStatus,
        priorityChanged: changedPriority,
      },
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : String(err),
    }
  }
}

export const updateTasks = async (input: {
  ids: string[]
  label?: TaskSchema['label']
  status?: TaskSchema['status']
  priority?: TaskSchema['priority']
}) => {
  try {
    let statusChanged = false
    let priorityChanged = false

    tasksStore = tasksStore.map(task => {
      if (!input.ids.includes(task.id)) return task

      const updated = {
        ...task,
        label: input.label ?? task.label,
        status: input.status ?? task.status,
        priority: input.priority ?? task.priority,
        updatedAt: new Date(),
      }

      if (task.status !== updated.status) statusChanged = true
      if (task.priority !== updated.priority) priorityChanged = true

      return updated
    })

    return {
      data: {
        statusChanged,
        priorityChanged,
      },
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : String(err),
    }
  }
}

export const deleteTask = async (input: { id: string }) => {
  try {
    tasksStore = tasksStore.filter(task => task.id !== input.id)

    return {
      data: null,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : String(err),
    }
  }
}

export const deleteTasks = async (input: { ids: string[] }) => {
  try {
    tasksStore = tasksStore.filter(task => !input.ids.includes(task.id))

    return {
      data: null,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : String(err),
    }
  }
}
