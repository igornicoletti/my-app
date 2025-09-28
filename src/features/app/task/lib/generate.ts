import { labels, priorities, statuses, type TaskSchema } from '@/features/app/task/lib/schema'
import { generateId } from '@/libs/id'
import { faker } from '@faker-js/faker'
import { customAlphabet } from 'nanoid'

export const generateCode = () => `TASK-${customAlphabet('0123456789', 4)()}`

export const taskGenerate = (options?: { archivedProb?: number }): TaskSchema => ({
  id: generateId('task'),
  code: generateCode(),
  title: faker.hacker.phrase().replace(/^./, l => l.toUpperCase()),
  estimatedHours: faker.number.int({ min: 1, max: 48 }),
  status: faker.helpers.arrayElement(Object.values(statuses)),
  label: faker.helpers.arrayElement(Object.values(labels)),
  priority: faker.helpers.arrayElement(Object.values(priorities)),
  archived: faker.datatype.boolean({ probability: options?.archivedProb ?? 0.2 }),
  createdAt: faker.date.past({ years: 2 }),
  updatedAt: new Date(),
})
