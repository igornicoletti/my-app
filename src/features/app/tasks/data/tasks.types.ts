import { ACTIONS, LABELS, PRIORITIES, STATUSES } from '@/features/app/tasks'

export type TTaskStatus = (typeof STATUSES)[number]
export type TTaskPriority = (typeof PRIORITIES)[number]
export type TTaskLabel = (typeof LABELS)[number]
export type TTaskAction = (typeof ACTIONS)[number]

export interface TTaskProps {
  id: string
  code: string
  title: string
  status: TTaskStatus
  priority: TTaskPriority
  label: TTaskLabel
  createdAt: string
}

export interface TTasksColumnsProps {
  statusCounts: Record<TTaskStatus, number>
  priorityCounts: Record<TTaskPriority, number>
}
