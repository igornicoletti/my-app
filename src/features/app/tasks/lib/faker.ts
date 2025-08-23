import { faker } from '@faker-js/faker'

import { type TaskSchema, labels, priorities, statuses } from '@/features/app/tasks/lib/schema'
import { generateId } from '@/lib'
import { customAlphabet } from 'nanoid'

export const generateRandomTask = (): TaskSchema => {
  return {
    id: generateId('task'),
    code: `TASK-${customAlphabet('0123456789', 4)()}`,
    title: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
    estimatedHours: faker.number.int({ min: 1, max: 24 }),
    status: faker.helpers.arrayElement(statuses),
    label: faker.helpers.arrayElement(labels),
    priority: faker.helpers.arrayElement(priorities),
    archived: faker.datatype.boolean({ probability: 0.2 }),
    createdAt: faker.date.past(),
    updatedAt: new Date(),
  }
}

export const generateRandomTasks = (count = 10): TaskSchema[] =>
  Array.from({ length: count }, generateRandomTask)
