import { EntitySheet } from '@/components/common/entity-sheet'
import { CreateTask } from '@/features/app/tasks/components/create'
import { UpdateTask } from '@/features/app/tasks/components/update'
import type { TaskSchema } from '@/features/app/tasks/lib/schemas'
import type { ComponentPropsWithoutRef } from 'react'

type TaskSheetProps = Omit<ComponentPropsWithoutRef<typeof EntitySheet<TaskSchema>>, 'createMode' | 'updateMode'> & {
  task?: TaskSchema | null
}

export const TaskSheet = ({ task, ...props }: TaskSheetProps) => {
  const isEditMode = !!task

  const commonProps = {
    open: props.open,
    onOpenChange: props.onOpenChange,
    trigger: props.trigger,
  }

  const createMode = {
    title: 'Create task',
    description: 'Fill in the details below to create a new task.',
    formComponent: <CreateTask />,
  }

  const updateMode = isEditMode ? {
    data: task,
    title: 'Update task',
    description: 'Update the task details and save the changes.',
    formComponent: <UpdateTask task={task!} />,
  } : undefined

  const onModeSuccess = () => {
    props.onOpenChange?.(false)
  }

  return <EntitySheet
    {...commonProps}
    createMode={createMode}
    updateMode={updateMode}
    onModeSuccess={onModeSuccess} />
}
