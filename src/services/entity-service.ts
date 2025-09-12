const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const createEntityService = <T extends {
  id: string
  createdAt?: Date
  updatedAt?: Date
}>(entityName: string, generateRandom: () => T) => {
  let items: T[] = []

  return {
    get: async (): Promise<T[]> => {
      await delay(200)
      return [...items]
    },

    seed: async (count: number): Promise<T[]> => {
      await delay(200)
      items = Array.from({ length: count }, () => generateRandom())
      return [...items]
    },

    create: async (input: Partial<T>): Promise<T> => {
      await delay(200)
      const newItem: T = {
        ...generateRandom(),
        ...input,
        createdAt: new Date(),
      }
      items = [newItem, ...items]
      return newItem
    },

    update: async (input: Partial<T> & { id: string }): Promise<T> => {
      await delay(200)
      const index = items.findIndex((i) => i.id === input.id)
      if (index === -1) throw new Error(`${entityName} not found`)

      const original = items[index]
      const updated: T = {
        ...original,
        ...input,
        updatedAt: new Date(),
      }

      items = items.map((i) => (i.id === input.id ? updated : i))
      return updated
    },

    bulkUpdate: async (input: {
      ids: string[]
    } & Record<string, unknown>): Promise<T[]> => {
      await delay(200)
      const { ids, ...updateData } = input
      const updatedItems: T[] = []

      items = items.map((i) => {
        if (ids.includes(i.id)) {
          const updated = { ...i, ...updateData, updatedAt: new Date() }
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
      await delay(200)
      const exists = items.some((i) => i.id === id)
      if (!exists) throw new Error(`${entityName} not found`)
      items = items.filter((i) => i.id !== id)
    },

    bulkDelete: async (ids: string[]): Promise<void> => {
      await delay(200)
      items = items.filter((i) => !ids.includes(i.id))
    },
  }
}
