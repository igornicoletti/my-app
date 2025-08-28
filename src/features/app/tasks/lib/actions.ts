import { useCallback, useSyncExternalStore } from 'react'

import type { CreateTaskSchema, TaskSchema, UpdateTaskSchema } from '@/features/app/tasks/lib/types'
import { generateRandomTask } from '@/features/app/tasks/lib/utils'

// ===== In-memory store =====
let tasks: TaskSchema[] = []

const listeners = new Set<() => void>()
const notify = () => {
  for (const l of listeners) l()
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const getAllTasks = () => tasks
export const setAllTasks = (newTasks: TaskSchema[]) => {
  tasks = [...newTasks]
  notify()
}

export const useTasks = () => {
  const getSnapshot = useCallback(() => getAllTasks(), [])
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

// ===== Seed =====
export const seedTasks = (input: { count?: number }) => {
  const count = input.count ?? 100
  const seeded = Array.from({ length: count }, () => generateRandomTask())
  setAllTasks(seeded)
  return seeded
}

// ===== CRUD =====
export const createTask = async (input: CreateTaskSchema) => {
  const current = getAllTasks()
  const newTask: TaskSchema = {
    ...generateRandomTask(),
    ...input,
    createdAt: new Date(),
  }
  const next = [newTask, ...current]
  setAllTasks(next)
  return { data: newTask, error: null as string | null }
}

export const updateTask = async (input: UpdateTaskSchema & { id: string }) => {
  const current = getAllTasks()
  const index = current.findIndex((t) => t.id === input.id)
  if (index === -1) return { data: null, error: 'Task not found' as const }

  const updated: TaskSchema = { ...current[index], ...input, updatedAt: new Date() }
  const next = [...current]
  next[index] = updated
  setAllTasks(next)
  return { data: updated, error: null as string | null }
}

export const updateTasks = async (input: {
  ids: string[]
  label?: TaskSchema['label']
  status?: TaskSchema['status']
  priority?: TaskSchema['priority']
}) => {
  const current = getAllTasks()
  const next = current.map(t =>
    input.ids.includes(t.id)
      ? {
        ...t,
        ...('label' in input ? { label: input.label } : {}),
        ...('status' in input ? { status: input.status } : {}),
        ...('priority' in input ? { priority: input.priority } : {}),
        updatedAt: new Date()
      }
      : t
  )
  const updated = next.filter(t => input.ids.includes(t.id))
  setAllTasks(next)
  return { data: updated, error: null as string | null }
}

export const deleteTask = async (input: { id: string }) => {
  const current = getAllTasks()
  const next = current.filter(t => t.id !== input.id)
  setAllTasks(next)
  return { data: null, error: null as string | null }
}

export const deleteTasks = async (input: { ids: string[] }) => {
  const current = getAllTasks()
  const next = current.filter(t => !input.ids.includes(t.id))
  setAllTasks(next)
  return { data: null, error: null as string | null }
}
