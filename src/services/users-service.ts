import type { CreateUserSchema, UpdateUserSchema, UserSchema } from '@/features/app/users/lib/schemas'
import { generateRandomUser } from '@/features/app/users/lib/utils'

let users: UserSchema[] = []

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const usersService = {
  get: async (): Promise<UserSchema[]> => {
    await delay(200)
    return [...users]
  },

  seed: async (count: number): Promise<UserSchema[]> => {
    await delay(200)
    users = Array.from({ length: count }, () => generateRandomUser())
    return [...users]
  },

  create: async (input: CreateUserSchema): Promise<UserSchema> => {
    await delay(200)
    const newUser: UserSchema = {
      ...generateRandomUser(),
      ...input,
      createdAt: new Date(),
    }

    users = [newUser, ...users]
    return newUser
  },

  update: async (input: UpdateUserSchema & { id: string }): Promise<UserSchema> => {
    await delay(200)
    const userIndex = users.findIndex((u) => u.id === input.id)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    const originalUser = users[userIndex]
    const updatedUser: UserSchema = {
      ...originalUser,
      ...input,
      updatedAt: new Date(),
    }

    users = users.map((user) => (user.id === input.id ? updatedUser : user))
    return updatedUser
  },

  bulkUpdate: async (
    input: { ids: string[] } & (
      | { status: UserSchema['status'] }
      | { role: UserSchema['role'] }
    ),
  ): Promise<UserSchema[]> => {
    await delay(200)

    const { ids, ...updateData } = input
    const updatedUsers: UserSchema[] = []

    users = users.map((user) => {
      if (ids.includes(user.id)) {
        const updatedUser = {
          ...user,
          ...updateData,
          updatedAt: new Date(),
        }
        updatedUsers.push(updatedUser)
        return updatedUser
      }
      return user
    })

    if (updatedUsers.length === 0) {
      throw new Error('No matching users found for bulk update')
    }

    return updatedUsers
  },

  delete: async (id: string): Promise<void> => {
    await delay(200)
    const userIndex = users.findIndex((u) => u.id === id)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    users = users.filter((u) => u.id !== id)
  },

  bulkDelete: async (ids: string[]): Promise<void> => {
    await delay(200)
    users = users.filter((u) => !ids.includes(u.id))
  },
}
