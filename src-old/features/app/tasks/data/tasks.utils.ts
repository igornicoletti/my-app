import { faker } from '@faker-js/faker'
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircle2Icon,
  CircleHelpIcon,
  CircleIcon,
  TimerIcon,
} from 'lucide-react'
import { customAlphabet, nanoid } from 'nanoid'
import type { Task } from './tasks.type'

const generateId = () => `task_${nanoid(6)}`
const generateCode = () => `TASK-${customAlphabet('0123456789', 4)()}`

export const generateTask = (): Task => ({
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

export const generateTasks = (count = 10): Task[] =>
  Array.from({ length: count }, generateTask)

export const getStatusIcon = (status: Task['status']) => {
  const statusIcons: Record<Task['status'], React.ElementType> = {
    todo: CircleHelpIcon,
    'in progress': TimerIcon,
    done: CheckCircle2Icon,
  }
  return statusIcons[status] ?? CircleIcon
}

export const getPriorityIcon = (priority: Task['priority']) => {
  const priorityIcons: Record<Task['priority'], React.ElementType> = {
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
