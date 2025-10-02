import { CommonEntity } from '@/components/common/entity'
import { TaskCreate } from '@/features/app/task/components/create'
import { TaskUpdate } from '@/features/app/task/components/update'
import type { TaskSchema } from '@/features/app/task/lib/schema'
import type { ReactNode } from 'react'

type TaskEntityProps = {
  task?: TaskSchema | null
  trigger?: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const TaskEntity = ({ task, onOpenChange, ...props }: TaskEntityProps) => {
  const isEditMode = !!task

  return (
    <CommonEntity
      {...props}
      onOpenChange={onOpenChange}
      onModeSuccess={() => onOpenChange?.(false)}
      createMode={{
        title: 'Create task',
        description: 'Fill in the details below to create a new task.',
      }}
      updateMode={isEditMode ? {
        data: task,
        title: 'Update task',
        description: 'Update the task details and save the changes.',
      } : undefined}>
      {({ onSuccess, data }) => (
        data
          ? <TaskUpdate task={data} onSuccess={onSuccess} />
          : <TaskCreate onSuccess={onSuccess} />
      )}
    </CommonEntity>
  )
}
