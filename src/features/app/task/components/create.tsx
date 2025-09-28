import { Button } from '@/components/ui/button'
import { SheetClose, SheetFooter } from '@/components/ui/sheet'
import { TaskForm } from '@/features/app/task/components/form'
import { useTaskCreate } from '@/features/app/task/lib/hook'
import type { TaskSchemaCreate } from '@/features/app/task/lib/schema'
import { taskSchemaCreate } from '@/features/app/task/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGapIcon } from '@phosphor-icons/react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'

interface TaskCreateProps {
  onSuccess?: () => void
}

export const TaskCreate = ({ onSuccess }: TaskCreateProps) => {
  const form = useForm<TaskSchemaCreate>({
    resolver: zodResolver(taskSchemaCreate),
    defaultValues: {
      label: 'Feature',
      status: 'Todo',
      priority: 'Medium',
      estimatedHours: 1,
    },
  })

  const { mutate: createTask, isPending } = useTaskCreate({
    onSuccess: () => {
      form.reset()
      onSuccess?.()
    },
  })

  return (
    <TaskForm form={form} onSubmit={createTask as (values: FieldValues) => void}>
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
