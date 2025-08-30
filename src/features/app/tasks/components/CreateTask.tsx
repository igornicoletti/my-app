import { zodResolver } from '@hookform/resolvers/zod'
import { SparkleIcon } from '@phosphor-icons/react'
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
  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      label: 'Feature',
      status: 'Todo',
      priority: 'Medium',
      estimatedHours: 1,
    }
  })

  const createTaskMutation = useCreateTask({
    onSuccess: () => form.reset()
  })

  return (
    <Sheet
      open={createTaskMutation.isSuccess ? false : undefined}
      onOpenChange={(open) => {
        if (!open) {
          form.reset()
          createTaskMutation.reset()
        }
      }}>
      <SheetTrigger asChild>
        <Button variant='default' size='sm'>
          <SparkleIcon />
          Add Task
        </Button>
      </SheetTrigger>
      <SheetContent className='w-full sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>Create task</SheetTitle>
          <SheetDescription>
            Fill in the details below to create a new task
          </SheetDescription>
        </SheetHeader>
        <TaskForm form={form} onSubmit={createTaskMutation.mutate}>
          <SheetFooter>
            <Button>
              Continue
            </Button>
            <SheetClose asChild>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
            </SheetClose>
          </SheetFooter>
        </TaskForm>
      </SheetContent>
    </Sheet>
  )
}
