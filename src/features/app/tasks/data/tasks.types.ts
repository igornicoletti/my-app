export interface TTaskProps {
  id: string
  code: string
  title: string
  status: 'todo' | 'in-progress' | 'done' | 'canceled'
  priority: 'low' | 'medium' | 'high'
  label: 'frontend' | 'backend' | 'design' | 'research'
  createdAt: string
}

export interface TTasksColumnsProps {
  statusCounts: Record<TTaskProps['status'], number>
  priorityCounts: Record<TTaskProps['priority'], number>
}

export type TTaskAction = 'edit' | 'delete' | 'label'
