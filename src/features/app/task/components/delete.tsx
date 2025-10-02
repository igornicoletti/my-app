import { CommonConfirm } from '@/components/common/confirm'
import { useTaskDelete } from '@/features/app/task/lib/hook'
import type { TaskSchema } from '@/features/app/task/lib/schema'
import type { Row } from '@tanstack/react-table'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

interface TaskDeleteProps extends Omit<ComponentPropsWithoutRef<typeof CommonConfirm>, 'onConfirm' | 'title' | 'description' | 'children'> {
  tasks: Row<TaskSchema>['original'][]
  trigger?: ReactNode
  onSuccess?: () => void
}

export const TaskDelete = ({ tasks, trigger, onSuccess, ...props }: TaskDeleteProps) => {
  const deleteTasksMutation = useTaskDelete({
    onSuccess: () => {
      onSuccess?.()
    },
  })

  const taskCount = tasks.length
  const title = `Are you absolutely sure?`
  const description = `This action cannot be undone. It will permanently delete your ${taskCount > 1 ? `${taskCount} tasks` : 'task'} from our server.`

  const handleConfirm = () => {
    const taskIds = tasks.map((t) => t.id)
    return deleteTasksMutation.mutateAsync(taskIds)
  }

  return (
    <CommonConfirm
      title={title}
      description={description}
      trigger={trigger}
      onConfirm={handleConfirm}
      {...props} />
  )
}
