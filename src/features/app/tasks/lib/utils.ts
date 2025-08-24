import { faker } from '@faker-js/faker'
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, CheckCircleIcon, CircleIcon, ProhibitIcon, TimerIcon } from '@phosphor-icons/react'
import { customAlphabet } from 'nanoid'

import { type TaskSchema, labels, priorities, statuses } from '@/features/app/tasks/lib/schema'
import { generateId } from '@/lib'

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

export const getStatusIcon = (status: TaskSchema['status']) => {
  const statusIcons = {
    canceled: ProhibitIcon,
    done: CheckCircleIcon,
    'in progress': TimerIcon,
    todo: CircleIcon,
  }
  return statusIcons[status] || CircleIcon
}

export const getPriorityIcon = (priority: TaskSchema['priority']) => {
  const priorityIcons = {
    high: ArrowUpIcon,
    low: ArrowDownIcon,
    medium: ArrowRightIcon,
  }
  return priorityIcons[priority] || CircleIcon
}

export const getFacetedCounts = <T extends Record<string, any>>(
  items: T[],
  key: keyof T,
  values: readonly string[],
): Record<string, number> => {
  const counts: Record<string, number> = Object.fromEntries(values.map((value) => [value, 0]))
  for (const item of items) {
    const value = item[key]
    if (typeof value === 'string' && value in counts) counts[value]++
  }
  return counts
}

export const getRangeValues = <T extends Record<string, any>>(
  items: T[],
  key: keyof T,
): [number, number] => {
  if (items.length === 0) return [0, 0]

  return items.reduce(
    (range, item) => {
      const value = Number(item[key])
      if (!Number.isFinite(value)) {
        return range
      }
      range[0] = Math.min(range[0], value)
      range[1] = Math.max(range[1], value)
      return range
    },
    [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
  )
}
