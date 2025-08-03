import { actionsConfig, labelsConfig, prioritiesConfig, statusesConfig } from '@/features/app/tasks'

export interface TTaskProps {
  id: string
  code: string
  title: string
  status: TTaskStatus
  priority: TTaskPriority
  label: TTaskLabel
  createdAt: Date
}

export interface TTasksColumnsProps {
  statusCounts: Record<TTaskStatus, number>
  priorityCounts: Record<TTaskPriority, number>
}

export type TTaskStatus = (typeof statusesConfig)[number]
export type TTaskPriority = (typeof prioritiesConfig)[number]
export type TTaskLabel = (typeof labelsConfig)[number]
export type TTaskAction = (typeof actionsConfig)[number]
