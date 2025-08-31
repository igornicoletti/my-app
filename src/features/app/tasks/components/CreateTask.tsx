import { zodResolver } from '@hookform/resolvers/zod'
import { SparkleIcon, SpinnerGapIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { TaskForm } from '@/features/app/tasks/components/TaskForm'
import { useCreateTask } from '@/features/app/tasks/hooks/useTasksMutations'
import { createTaskSchema, type CreateTaskSchema } from '@/features/app/tasks/lib/types'

export const CreateTask = () => {
  const [open, setOpen] = useState(false)

  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema)
  })

  const createTaskMutation = useCreateTask({
    onSuccess: () => {
      form.reset()
      setOpen(false)
    }
  })

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='default' size='sm'>
          <SparkleIcon />
          New
        </Button>
      </SheetTrigger>
      <SheetContent className='w-full sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>Create Task</SheetTitle>
          <SheetDescription>
            Fill in the details below to create a new task.
          </SheetDescription>
        </SheetHeader>
        <TaskForm form={form} onSubmit={createTaskMutation.mutate}>
          <SheetFooter className='mt-auto'>
            <Button
              type='submit'
              disabled={createTaskMutation.isPending}>
              {createTaskMutation.isPending ? (
                <SpinnerGapIcon className='animate-spin' />
              ) : (
                'Save Task'
              )}
            </Button>
            <SheetClose asChild>
              <Button type='button' variant='secondary'>
                Cancel
              </Button>
            </SheetClose>
          </SheetFooter>
        </TaskForm>
      </SheetContent>
    </Sheet>
  )
}
