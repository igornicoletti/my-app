import { type TaskSchema } from '@/features/app/tasks/lib/schemas'
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, CheckCircleIcon, CircleIcon, ProhibitIcon, TimerIcon } from '@phosphor-icons/react'

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
