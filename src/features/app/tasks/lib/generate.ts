import { labels, priorities, statuses, type TaskSchema } from '@/features/app/tasks/lib/schemas'
import { generateId } from '@/lib/id'
import { faker } from '@faker-js/faker'
import { customAlphabet } from 'nanoid'

export const generateRandomTask = (): TaskSchema => ({
  id: generateId('task'),
  code: `TASK-${customAlphabet('0123456789', 4)()}`,
  title: faker.hacker.phrase().replace(/^./, l => l.toUpperCase()),
  estimatedHours: faker.number.int({ min: 1, max: 48 }),
  status: faker.helpers.arrayElement(statuses),
  label: faker.helpers.arrayElement(labels),
  priority: faker.helpers.arrayElement(priorities),
  archived: faker.datatype.boolean({ probability: 0.2 }),
  createdAt: faker.date.past({ years: 2 }),
  updatedAt: new Date(),
})
