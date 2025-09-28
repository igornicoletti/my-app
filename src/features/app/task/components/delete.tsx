import { CommonConfirm } from '@/components/common/confirm'
import { useTaskDelete } from '@/features/app/task/lib/hook'
import type { TaskSchema } from '@/features/app/task/lib/schema'
import type { Row } from '@tanstack/react-table'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

interface TaskDeleteProps extends Omit<ComponentPropsWithoutRef<typeof CommonConfirm>, 'children'> {
  tasks: Row<TaskSchema>['original'][]
  trigger?: ReactNode
  onSuccess?: () => void
}

export const TaskDelete = ({ tasks, trigger, onSuccess, ...props }: TaskDeleteProps) => {
  const deleteTasks = useTaskDelete({
    onSuccess: () => {
      onSuccess?.()
    },
  })

  return (
    <CommonConfirm
      {...props}
      trigger={trigger}
      onConfirm={() => deleteTasks.mutate(tasks.map((t) => t.id))} />
  )
}
