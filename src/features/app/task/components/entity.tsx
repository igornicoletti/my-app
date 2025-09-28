import { CommonEntity } from '@/components/common/entity'
import { TaskCreate } from '@/features/app/task/components/create'
import { TaskUpdate } from '@/features/app/task/components/update'
import type { TaskSchema } from '@/features/app/task/lib/schema'
import type { ComponentPropsWithoutRef } from 'react'

type TaskEntityProps = Omit<ComponentPropsWithoutRef<typeof CommonEntity<TaskSchema>>, 'createMode' | 'updateMode'> & {
  task?: TaskSchema | null
}

export const TaskEntity = ({ task, ...props }: TaskEntityProps) => {
  const isEditMode = !!task

  const commonProps = {
    open: props.open,
    onOpenChange: props.onOpenChange,
    trigger: props.trigger,
  }

  const createMode = {
    title: 'Create task',
    description: 'Fill in the details below to create a new task.',
    formComponent: <TaskCreate />,
  }

  const updateMode = isEditMode ? {
    data: task,
    title: 'Update task',
    description: 'Update the task details and save the changes.',
    formComponent: <TaskUpdate task={task!} />,
  } : undefined

  const onModeSuccess = () => {
    props.onOpenChange?.(false)
  }

  return <CommonEntity
    {...commonProps}
    createMode={createMode}
    updateMode={updateMode}
    onModeSuccess={onModeSuccess} />
}
