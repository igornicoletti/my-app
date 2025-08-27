import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGapIcon } from '@phosphor-icons/react'
import type { ComponentPropsWithRef } from 'react'
import { useEffect, useTransition } from 'react'
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
  SheetTitle
} from '@/components/ui/sheet'
import { TaskForm } from '@/features/app/tasks/components'
import { updateTask } from '@/features/app/tasks/lib/actions'
import { updateTaskSchema, type TaskSchema, type UpdateTaskSchema, } from '@/features/app/tasks/lib/schema'

interface UpdateTaskProps extends ComponentPropsWithRef<typeof Sheet> {
  task: TaskSchema | null
}

export const UpdateTask = ({ task, ...props }: UpdateTaskProps) => {
  const [isPending, startTransition] = useTransition()

  const form = useForm<UpdateTaskSchema>({
    resolver: zodResolver(updateTaskSchema),
  })

  useEffect(() => {
    if (task) {
      form.reset({
        title: task.title,
        label: task.label,
        status: task.status,
        priority: task.priority,
        estimatedHours: task.estimatedHours,
      })
    }
  }, [task, form])

  const onSubmit = (input: UpdateTaskSchema) => {
    startTransition(async () => {
      if (!task) return

      const { error } = await updateTask({ id: task.id, ...input })

      if (error) {
        toast.error(error)
        return
      }

      form.reset(input)
      props.onOpenChange?.(false)
      toast.success(`Task '${input.title ?? task.title}' updated`)
    })
  }

  return (
    <Sheet {...props}>
      <SheetContent className='flex flex-col gap-6 sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>Update task</SheetTitle>
          <SheetDescription>
            Update the task details and save the changes
          </SheetDescription>
        </SheetHeader>
        <TaskForm<UpdateTaskSchema> form={form} onSubmit={onSubmit}>
          <SheetFooter>
            <Button disabled={isPending}>
              {isPending && <SpinnerGapIcon className='animate-spin' aria-hidden='true' />}
              Save
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
