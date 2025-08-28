import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGapIcon } from '@phosphor-icons/react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

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
import { TaskForm } from '@/features/app/tasks/components'
import { createTask } from '@/features/app/tasks/lib/actions'
import { createTaskSchema, type CreateTaskSchema } from '@/features/app/tasks/lib/schema'

export const CreateTask = () => {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      label: 'Feature',
      status: 'Todo',
      priority: 'Medium',
      estimatedHours: 1
    }
  })

  const onSubmit = (input: CreateTaskSchema) => {
    startTransition(async () => {
      const { error } = await createTask(input)

      if (error) {
        toast.error(error)
        return
      }

      form.reset()
      setOpen(false)
      toast.success('Task created')
    })
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='default' size='sm'>
          New task
        </Button>
      </SheetTrigger>
      <SheetContent className='w-full sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>Create task</SheetTitle>
          <SheetDescription>
            Fill in the details below to create a new task
          </SheetDescription>
        </SheetHeader>
        <TaskForm form={form} onSubmit={onSubmit}>
          <SheetFooter>
            <Button disabled={isPending}>
              {isPending && <SpinnerGapIcon className='animate-spin' aria-hidden='true' />}
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
