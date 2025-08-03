import type { TTaskAction, TTaskPriority, TTaskStatus } from '@/features/app/tasks'
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  CircleIcon,
  PencilSimpleIcon,
  ProhibitIcon,
  StickerIcon,
  TimerIcon,
  TrashSimpleIcon
} from '@phosphor-icons/react'

export const getStatusIcon = (status: TTaskStatus) => {
  const statusIcons = {
    canceled: ProhibitIcon,
    done: CheckCircleIcon,
    'in-progress': TimerIcon,
    todo: CircleIcon,
  } as const

  return statusIcons[status]
}

export const getPriorityIcon = (priority: TTaskPriority) => {
  const priorityIcons = {
    high: ArrowUpIcon,
    medium: ArrowRightIcon,
    low: ArrowDownIcon,
  } as const

  return priorityIcons[priority]
}

export const getActionIcon = (action: TTaskAction) => {
  const actionIcons = {
    edit: PencilSimpleIcon,
    delete: TrashSimpleIcon,
    label: StickerIcon,
  } as const

  return actionIcons[action]
}
