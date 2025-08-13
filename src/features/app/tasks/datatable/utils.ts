import { faker } from '@faker-js/faker'
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  CircleIcon,
  QuestionIcon,
  TimerIcon
} from '@phosphor-icons/react'
import { customAlphabet, nanoid } from 'nanoid'

import type { TaskSchema } from '@/features/app/tasks/api/schemas'

const generateId = () => `task_${nanoid(6)}`
const generateCode = () => `TASK-${customAlphabet('0123456789', 4)()}`

export const generateTask = (): TaskSchema => ({
  id: generateId(),
  code: generateCode(),
  title: faker.hacker.phrase().replace(/^./, (l) => l.toUpperCase()),
  estimatedHours: faker.number.int({ min: 1, max: 24 }),
  status: faker.helpers.arrayElement(['todo', 'in progress', 'done']),
  label: faker.helpers.arrayElement(['bug', 'feature', 'documentation']),
  priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
  archived: faker.datatype.boolean({ probability: 0.2 }),
  createdAt: faker.date.past(),
  updatedAt: new Date(),
})

export const generateTasks = (count = 10): TaskSchema[] =>
  Array.from({ length: count }, generateTask)

export const getStatusIcon = (status: TaskSchema['status']) => {
  const statusIcons: Record<TaskSchema['status'], React.ElementType> = {
    todo: QuestionIcon,
    'in progress': TimerIcon,
    done: CheckCircleIcon,
  }
  return statusIcons[status] ?? CircleIcon
}

export const getPriorityIcon = (priority: TaskSchema['priority']) => {
  const priorityIcons: Record<TaskSchema['priority'], React.ElementType> = {
    low: ArrowDownIcon,
    medium: ArrowRightIcon,
    high: ArrowUpIcon,
  }
  return priorityIcons[priority] ?? CircleIcon
}

export const getFacetedCounts = <T extends Record<string, any>>(
  items: T[],
  key: keyof T,
  values: readonly string[],
) => {
  const counts: Record<string, number> = Object.fromEntries(
    values.map((value) => [value, 0]),
  )
  for (const item of items) {
    const value = item[key]
    if (value in counts) counts[value]++
  }
  return counts
}

export const getRangeValues = <T extends Record<string, any>>(
  items: T[],
  key: keyof T,
): [number, number] => {
  const numbers = items.map((item) => Number(item[key])).filter(Number.isFinite)
  if (!numbers.length) return [0, 0]
  return [Math.min(...numbers), Math.max(...numbers)]
}
