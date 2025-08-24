import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGapIcon } from '@phosphor-icons/react'
import { useEffect, type ComponentPropsWithRef } from 'react'
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
} from '@/components/ui/sheet'
import { TaskForm } from '@/features/app/tasks/components'
import { updateTaskSchema, type TaskSchema, type UpdateTaskSchema } from '@/features/app/tasks/lib/schema'

interface UpdateTaskProps extends ComponentPropsWithRef<typeof Sheet> {
  task: TaskSchema | null
}

export const UpdateTask = ({ task, ...props }: UpdateTaskProps) => {
  const fetcher = useFetcher()
  const isPending = fetcher.state !== 'idle'

  const form = useForm<UpdateTaskSchema>({
    resolver: zodResolver(updateTaskSchema),
  })

  useEffect(() => {
    if (task) {
      form.reset(task)
    }
  }, [task, form])

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      if (!fetcher.data.error) {
        toast.success('Task updated')
        props.onOpenChange?.(false)
      } else {
        toast.error(fetcher.data.error)
      }
    }
  }, [fetcher.state, fetcher.data, props.onOpenChange])

  const onSubmit = (input: UpdateTaskSchema) => {
    if (!task) return

    const formData = new FormData()
    formData.append('intent', 'updateTask')
    formData.append('id', task.id)

    Object.entries(input).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value))
      }
    })

    fetcher.submit(formData, { method: 'POST' })
  }

  return (
    <Sheet {...props}>
      <SheetContent className='w-full max-w-md'>
        <SheetHeader>
          <SheetTitle>Update task</SheetTitle>
          <SheetDescription>Update the task details and save the changes</SheetDescription>
        </SheetHeader>
        <TaskForm<UpdateTaskSchema> form={form} onSubmit={onSubmit}>
          <SheetFooter>
            <Button disabled={isPending}>
              {isPending && <SpinnerGapIcon className='animate-spin' />}
              Save Changes
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
