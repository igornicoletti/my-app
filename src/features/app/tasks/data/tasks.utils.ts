import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  CircleIcon,
  QuestionIcon,
  TimerIcon,
  XCircleIcon
} from '@phosphor-icons/react'

import type { TaskProps } from '@/features/app/tasks/data/tasks.types'

export const getStatusIcon = (status: TaskProps['status']) => {
  const statusIcons = {
    canceled: XCircleIcon,
    done: CheckCircleIcon,
    'in-progress': TimerIcon,
    todo: QuestionIcon,
  } as const

  return statusIcons[status] || CircleIcon
}

export const getPriorityIcon = (priority: TaskProps['priority']) => {
  const priorityIcons = {
    high: ArrowUpIcon,
    low: ArrowDownIcon,
    medium: ArrowRightIcon,
  } as const

  return priorityIcons[priority] || CircleIcon
}
