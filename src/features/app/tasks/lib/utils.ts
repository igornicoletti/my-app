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

import { labels, priorities, statuses, type TaskSchema } from '@/features/app/tasks/lib/schemas'
import { generateId } from '@/lib/id'

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
