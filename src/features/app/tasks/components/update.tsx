import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGapIcon } from '@phosphor-icons/react'
import type { ComponentPropsWithRef } from 'react'
import { useEffect } from 'react'
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
} from '@/components/ui/sheet'
import { TaskForm } from '@/features/app/tasks/components/form'
import { useUpdateTask } from '@/features/app/tasks/hooks/use-tasks-mutations'
import { updateTaskSchema, type TaskSchema, type UpdateTaskSchema } from '@/features/app/tasks/lib/schemas'

interface UpdateTaskProps extends ComponentPropsWithRef<typeof Sheet> {
  task: TaskSchema | null
}

export const UpdateTask = ({ task, ...props }: UpdateTaskProps) => {
  const form = useForm<UpdateTaskSchema>({
    resolver: zodResolver(updateTaskSchema)
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

  const updateTaskMutation = useUpdateTask({
    onSuccess: (data) => {
      form.reset(data)
      props.onOpenChange?.(false)
    },
  })

  const onSubmit = (input: UpdateTaskSchema) => {
    if (!task) return
    updateTaskMutation.mutate({
      id: task.id,
      ...input
    })
  }

  return (
    <Sheet {...props}>
      <SheetContent className='w-full sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>Update task</SheetTitle>
          <SheetDescription>Update the task details and save the changes.</SheetDescription>
        </SheetHeader>
        <TaskForm form={form} onSubmit={onSubmit}>
          <SheetFooter>
            <Button disabled={updateTaskMutation.isPending} type='submit'>
              {!updateTaskMutation.isPending ? 'Save' : <SpinnerGapIcon className='animate-spin' />}
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
