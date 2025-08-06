import { customAlphabet, nanoid } from "nanoid"

import { labelsConfig, prioritiesConfig, statusesConfig } from '@/features/app/tasks'
import { faker } from "@faker-js/faker"

const generateId = () => `task_${nanoid(6)}`
const generateCode = () => `TASK-${customAlphabet("0123456789", 4)()}`

export const generateTask = () => ({
  id: generateId(),
  code: generateCode(),
  title: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  estimatedHours: faker.number.int({ min: 1, max: 24 }),
  status: faker.helpers.arrayElement(statusesConfig),
  label: faker.helpers.arrayElement(labelsConfig),
  priority: faker.helpers.arrayElement(prioritiesConfig),
  archived: faker.datatype.boolean({ probability: 0.2 }),
  createdAt: new Date(),
  updatedAt: new Date()
})

export const generateTasks = (count: number = 10) => Array.from({
  length: count
}, generateTask)
