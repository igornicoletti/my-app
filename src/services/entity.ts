import { z } from 'zod'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const ServiceEntity = <
  T extends { id: string; createdAt?: Date; updatedAt?: Date },
  TCreate extends Record<string, unknown>,
  TUpdate extends Record<string, unknown>
>(
  entityName: string,
  generateRandom: () => T,
  createSchema: z.ZodType<TCreate>,
  updateSchema: z.ZodType<TUpdate>
) => {
  let items: T[] = []

  return {
    get: async (): Promise<T[]> => {
      await delay(50)
      return [...items]
    },

    seed: async (count: number): Promise<T[]> => {
      await delay(50)
      items = Array.from({ length: count }, () => generateRandom())
      return [...items]
    },

    create: async (input: TCreate): Promise<T> => {
      await delay(50)
      const parsed = createSchema.parse(input)

      const newItem: T = {
        ...generateRandom(),
        ...parsed,
        createdAt: new Date(),
      }
      items = [newItem, ...items]
      return newItem
    },

    update: async (input: TUpdate & { id: string }): Promise<T> => {
      await delay(50)
      const index = items.findIndex((i) => i.id === input.id)
      if (index === -1) throw new Error(`${entityName} not found`)

      const parsed = updateSchema.parse(input)

      const original = items[index]
      const updated: T = {
        ...original,
        ...parsed,
        updatedAt: new Date(),
      }

      items = items.map((i) => (i.id === input.id ? updated : i))
      return updated
    },

    bulkUpdate: async (input: { ids: string[]; fields: TUpdate }): Promise<T[]> => {
      await delay(50)
      const { ids, fields } = input
      const parsed = updateSchema.parse(fields)
      const updatedItems: T[] = []

      items = items.map((i) => {
        if (ids.includes(i.id)) {
          const updated = { ...i, ...parsed, updatedAt: new Date() }
          updatedItems.push(updated as T)
          return updated as T
        }
        return i
      })

      if (updatedItems.length === 0) {
        throw new Error(`No matching ${entityName.toLowerCase()}s found for bulk update`)
      }

      return updatedItems
    },

    delete: async (id: string): Promise<void> => {
      await delay(50)
      const exists = items.some((i) => i.id === id)
      if (!exists) throw new Error(`${entityName} not found`)
      items = items.filter((i) => i.id !== id)
    },

    bulkDelete: async (ids: string[]): Promise<void> => {
      await delay(50)
      items = items.filter((i) => !ids.includes(i.id))
    },
  }
}
