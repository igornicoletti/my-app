import { ConfirmDialog } from '@/components/common/confirm-dialog'
import { useDeleteTasks } from '@/features/app/tasks/lib/hooks'
import type { TaskSchema } from '@/features/app/tasks/lib/schemas'
import type { Row } from '@tanstack/react-table'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

interface DeleteTasksProps extends Omit<ComponentPropsWithoutRef<typeof ConfirmDialog>, 'children'> {
  tasks: Row<TaskSchema>['original'][]
  trigger?: ReactNode
  onSuccess?: () => void
}

export const DeleteTasks = ({ tasks, trigger, onSuccess, ...props }: DeleteTasksProps) => {
  const deleteTasks = useDeleteTasks({
    onSuccess: () => {
      onSuccess?.()
    },
  })

  return (
    <ConfirmDialog
      {...props}
      trigger={trigger}
      onConfirm={() => deleteTasks.mutate(tasks.map((t) => t.id))} />
  )
}
