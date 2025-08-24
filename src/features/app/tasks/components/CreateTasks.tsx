import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGapIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useFetcher } from 'react-router-dom'
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
import { createTaskSchema, type CreateTaskSchema } from '@/features/app/tasks/lib/schema'

export const CreateTasks = () => {
  const [open, setOpen] = useState(false)
  const fetcher = useFetcher()
  const isPending = fetcher.state !== 'idle'

  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema)
  })

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      if (!fetcher.data.error) {
        toast.success('Task created')
        form.reset()
        setOpen(false)
      } else {
        toast.error(fetcher.data.error)
      }
    }
  }, [fetcher.state, fetcher.data, form])

  const onSubmit = (input: CreateTaskSchema) => {
    const formData = new FormData()
    formData.append('intent', 'createTask')
    formData.append('title', input.title)
    formData.append('label', input.label)
    formData.append('status', input.status)
    formData.append('priority', input.priority)
    formData.append('estimatedHours', String(input.estimatedHours))

    fetcher.submit(formData, { method: 'POST' })
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='default' size='sm'>
          New Task
        </Button>
      </SheetTrigger>
      <SheetContent className='w-full max-w-md'>
        <SheetHeader>
          <SheetTitle>Create task</SheetTitle>
          <SheetDescription>Fill in the details below to create a new task</SheetDescription>
        </SheetHeader>
        <TaskForm form={form} onSubmit={onSubmit}>
          <SheetFooter>
            <Button disabled={isPending}>
              {isPending && <SpinnerGapIcon className='animate-spin' />}
              Create
            </Button>
            <SheetClose asChild>
              <Button variant='outline' type='button'>
                Cancel
              </Button>
            </SheetClose>
          </SheetFooter>
        </TaskForm>
      </SheetContent>
    </Sheet>
  )
}
