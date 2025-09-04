import { useCallback, useSyncExternalStore } from 'react'

import type { CreateUserSchema, UpdateUserSchema, UserSchema } from '@/features/app/users/lib/schemas'
import { generateRandomUser } from '@/features/app/users/lib/utils'

let users: UserSchema[] = []

const listeners = new Set<() => void>()
const notify = () => {
  for (const l of listeners) l()
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const getAllUsers = () => users
export const setAllUsers = (newUsers: UserSchema[]) => {
  users = [...newUsers]
  notify()
}

export const useUsers = () => {
  const getSnapshot = useCallback(() => getAllUsers(), [])
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

export const seedUsers = (input: { count?: number }) => {
  const count = input.count ?? 50
  const seeded = Array.from({ length: count }, () => generateRandomUser())
  setAllUsers(seeded)
  return seeded
}

export const createUser = async (input: CreateUserSchema) => {
  const current = getAllUsers()
  const newUser: UserSchema = {
    ...generateRandomUser(),
    ...input,
    createdAt: new Date(),
  }
  const next = [newUser, ...current]
  setAllUsers(next)
  return { data: newUser, error: null as string | null }
}

export const updateUser = async (input: UpdateUserSchema & { id: string }) => {
  const current = getAllUsers()
  const index = current.findIndex((u) => u.id === input.id)
  if (index === -1) return { data: null, error: 'User not found' as const }

  const updated: UserSchema = { ...current[index], ...input, updatedAt: new Date() }
  const next = [...current]
  next[index] = updated
  setAllUsers(next)
  return { data: updated, error: null as string | null }
}

export const updateUsers = async (input: {
  ids: string[]
  status?: UserSchema['status']
  role?: UserSchema['role']
}) => {
  const current = getAllUsers()
  const next = current.map(u =>
    input.ids.includes(u.id)
      ? {
        ...u,
        ...('status' in input ? { status: input.status } : {}),
        ...('role' in input ? { role: input.role } : {}),
        updatedAt: new Date()
      }
      : u
  )
  const updated = next.filter(u => input.ids.includes(u.id))
  setAllUsers(next)
  return { data: updated, error: null as string | null }
}

export const deleteUser = async (input: { id: string }) => {
  const current = getAllUsers()
  const next = current.filter(u => u.id !== input.id)
  setAllUsers(next)
  return { data: null, error: null as string | null }
}

export const deleteUsers = async (input: { ids: string[] }) => {
  const current = getAllUsers()
  const next = current.filter(u => !input.ids.includes(u.id))
  setAllUsers(next)
  return { data: null, error: null as string | null }
}
