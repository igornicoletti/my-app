import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  PencilSimpleIcon,
  QuestionIcon,
  StickerIcon,
  TimerIcon,
  TrashSimpleIcon,
  XCircleIcon
} from '@phosphor-icons/react'

import type {
  TTaskAction,
  TTaskPriority,
  TTaskStatus
} from '@/features/app/tasks'

export const getStatusIcon = (status: TTaskStatus) => {
  const statusIcons = {
    canceled: XCircleIcon,
    done: CheckCircleIcon,
    'in-progress': TimerIcon,
    todo: QuestionIcon,
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
