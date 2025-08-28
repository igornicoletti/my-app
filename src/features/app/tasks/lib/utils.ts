import { faker } from '@faker-js/faker'
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  CircleIcon,
  ProhibitIcon,
  TimerIcon
} from '@phosphor-icons/react'
import { customAlphabet } from 'nanoid'

import { labels, priorities, statuses, type TaskSchema } from '@/features/app/tasks/lib/types'
import { generateId } from '@/lib/id'

export const generateRandomTask = (): TaskSchema => ({
  id: generateId('task'),
  code: `TASK-${customAlphabet('0123456789', 4)()}`,
  title: faker.hacker.phrase().replace(/^./, l => l.toUpperCase()),
  estimatedHours: faker.number.int({ min: 1, max: 24 }),
  status: faker.helpers.arrayElement(statuses),
  label: faker.helpers.arrayElement(labels),
  priority: faker.helpers.arrayElement(priorities),
  archived: faker.datatype.boolean({ probability: 0.2 }),
  createdAt: faker.date.past(),
  updatedAt: new Date(),
})

export const generateRandomTasks = (count = 10): TaskSchema[] =>
  Array.from({ length: count }, generateRandomTask)

export const getStatusIcon = (status: TaskSchema['status']) => {
  const statusIcons: Record<TaskSchema['status'], any> = {
    Canceled: ProhibitIcon,
    Done: CheckCircleIcon,
    'In progress': TimerIcon,
    Todo: CircleIcon,
  }
  return statusIcons[status] || CircleIcon
}

export const getPriorityIcon = (priority: TaskSchema['priority']) => {
  const priorityIcons: Record<TaskSchema['priority'], any> = {
    High: ArrowUpIcon,
    Low: ArrowDownIcon,
    Medium: ArrowRightIcon,
  }
  return priorityIcons[priority] || CircleIcon
}

export const getRangeValues = <T extends Record<string, any>>(
  items: T[],
  key: keyof T,
): [number, number] => {
  if (items.length === 0) return [0, 0]

  const numbers = items
    .map((item) => Number(item[key]))
    .filter((num) => Number.isFinite(num))

  if (numbers.length === 0) return [0, 0]

  const min = Math.min(...numbers)
  const max = Math.max(...numbers)

  return [min, max]
}
