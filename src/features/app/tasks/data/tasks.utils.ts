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

import type { TTaskAction, TTaskProps } from '@/features/app/tasks'

export const getStatusIcon = (status: TTaskProps['status']) => {
  const statusIcons = {
    canceled: XCircleIcon,
    done: CheckCircleIcon,
    'in-progress': TimerIcon,
    todo: QuestionIcon,
  } as const

  return statusIcons[status]
}

export const getPriorityIcon = (priority: TTaskProps['priority']) => {
  const priorityIcons = {
    high: ArrowUpIcon,
    low: ArrowDownIcon,
    medium: ArrowRightIcon,
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
