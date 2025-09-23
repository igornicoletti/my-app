import { Button } from '@/components/ui/button'
import { SheetClose, SheetFooter } from '@/components/ui/sheet'
import { TaskForm } from '@/features/app/task/components/form'
import { useCreateTask } from '@/features/app/task/lib/hooks'
import type { CreateTaskSchema } from '@/features/app/task/lib/schemas'
import { createTaskSchema } from '@/features/app/task/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGapIcon } from '@phosphor-icons/react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'

interface CreateTaskProps {
  onSuccess?: () => void
}

export const CreateTask = ({ onSuccess }: CreateTaskProps) => {
  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      label: 'Feature',
      status: 'Todo',
      priority: 'Medium',
      estimatedHours: 1,
    },
  })

  const { mutate: createTask, isPending } = useCreateTask({
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
