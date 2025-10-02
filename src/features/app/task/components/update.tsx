import { Button } from '@/components/ui/button'
import { SheetClose, SheetFooter } from '@/components/ui/sheet'
import { TaskForm } from '@/features/app/task/components/form'
import { useTaskUpdate } from '@/features/app/task/lib/hook'
import type { TaskSchema, TaskSchemaUpdate } from '@/features/app/task/lib/schema'
import { taskSchemaUpdate } from '@/features/app/task/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGapIcon } from '@phosphor-icons/react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'

interface TaskUpdateProps {
  task: TaskSchema
  onSuccess?: (data?: TaskSchema) => void
}

export const TaskUpdate = ({ task, onSuccess }: TaskUpdateProps) => {
  const form = useForm<TaskSchemaUpdate>({
    resolver: zodResolver(taskSchemaUpdate),
    defaultValues: {
      title: task.title,
      label: task.label,
      status: task.status,
      priority: task.priority,
      estimatedHours: task.estimatedHours,
    },
  })

  const { mutate: updateTask, isPending } = useTaskUpdate({
    onSuccess: () => {
      onSuccess?.()
    },
  })

  const onSubmit = (values: TaskSchemaUpdate) => updateTask({ id: task.id, ...values })

  return (
    <TaskForm form={form} onSubmit={onSubmit as (values: FieldValues) => void}>
      <SheetFooter>
        <SheetClose asChild>
          <Button type='button' variant='outline'>
            Cancel
          </Button>
        </SheetClose>
        <Button disabled={isPending} type='submit'>
          {isPending ? <SpinnerGapIcon className='animate-spin' /> : 'Save'}
        </Button>
      </SheetFooter>
    </TaskForm>
  )
}
