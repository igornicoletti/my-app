import { Button } from '@/components/ui/button'
import { SheetClose, SheetFooter } from '@/components/ui/sheet'
import { TaskForm } from '@/features/app/tasks/components/form'
import { useUpdateTask } from '@/features/app/tasks/lib/hooks'
import type { TaskSchema, UpdateTaskSchema } from '@/features/app/tasks/lib/schemas'
import { updateTaskSchema } from '@/features/app/tasks/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGapIcon } from '@phosphor-icons/react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'

interface UpdateTaskProps {
  task: TaskSchema
  onSuccess?: (data?: TaskSchema) => void
}

export const UpdateTask = ({ task, onSuccess }: UpdateTaskProps) => {
  const form = useForm<UpdateTaskSchema>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: task.title,
      label: task.label,
      status: task.status,
      priority: task.priority,
      estimatedHours: task.estimatedHours,
    },
  })

  const { mutate: updateTask, isPending } = useUpdateTask({
    onSuccess: (data) => {
      onSuccess?.(data)
    },
  })

  const onSubmit = (values: UpdateTaskSchema) => updateTask({ id: task.id, ...values })

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
