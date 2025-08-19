import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui'
import { Button } from '@/components/ui/button'
import { taskSchema, type TaskSchema } from '@/features/app/tasks/api/schema'
import { TasksForm } from '@/features/app/tasks/components/TasksForm'
import { useSubmitForm, useToast } from '@/hooks'

interface UpdateTasksProps {
  task: TaskSchema | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: (task: TaskSchema) => void
}

export const UpdateTasks = ({ task, open, onOpenChange, onSuccess }: UpdateTasksProps) => {
  const { successToast } = useToast()

  const form = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: task ?? {
      id: '',
      code: '',
      title: '',
      estimatedHours: 0,
      status: 'todo',
      label: 'feature',
      priority: 'medium',
      archived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  useEffect(() => {
    if (task && open) {
      form.reset(task)
    }
  }, [task, open])

  const { onSubmit, isLoading } = useSubmitForm(async (data: TaskSchema) => {
    await new Promise(res => setTimeout(res, 500))
    form.reset(data)
    onOpenChange(false)
    onSuccess?.({ ...data, updatedAt: new Date() })
    successToast({
      title: 'Task Updated!',
      description: `The task ${data.title} has been successfully updated.`
    })
  })

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='w-full max-w-sm'>
        <SheetHeader>
          <SheetTitle>Update task</SheetTitle>
          <SheetDescription>
            Update the task details and save the changes
          </SheetDescription>
        </SheetHeader>
        <TasksForm form={form} onSubmit={onSubmit}>
          <SheetFooter>
            <Button disabled={isLoading} type='submit'>
              Save Task
            </Button>
            <SheetClose asChild>
              <Button variant='outline'>Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </TasksForm>
      </SheetContent>
    </Sheet>
  )
}
