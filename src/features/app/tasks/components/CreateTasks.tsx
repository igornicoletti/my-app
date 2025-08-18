import { zodResolver } from '@hookform/resolvers/zod'
import { customAlphabet } from 'nanoid'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui'
import { Button } from '@/components/ui/button'
import { taskSchema, type TaskSchema } from '@/features/app/tasks/api/schema'
import { TasksForm } from '@/features/app/tasks/components/TasksForm'
import { useSubmitForm, useToast } from '@/hooks'

const generateId = () => `task_${crypto.randomUUID().slice(0, 8)}`
const generateCode = () => {
  const random = customAlphabet('0123456789', 4)
  return `TASK-${random()}`
}

interface CreateTasksProps {
  onCreated?: (task: TaskSchema) => void
}

export const CreateTasks = ({ onCreated }: CreateTasksProps) => {
  const [open, setOpen] = useState(false)
  const { successToast } = useToast()

  const form = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
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
    if (open) {
      form.reset({
        ...form.getValues(),
        id: generateId(),
        code: generateCode(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
  }, [open])

  const { onSubmit, isLoading } = useSubmitForm(async (data: TaskSchema) => {
    await new Promise(res => setTimeout(res, 500))
    form.reset()
    setOpen(false)
    onCreated?.(data)
    successToast({
      title: 'Task Created!',
      description: `The task "${data.title}" has been successfully created.`,
    })
  })

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='default' size='sm'>
          Create Task
        </Button>
      </SheetTrigger>
      <SheetContent className='w-full max-w-sm'>
        <SheetHeader>
          <SheetTitle>Create task</SheetTitle>
          <SheetDescription>
            Fill in the details below to create a new task
          </SheetDescription>
        </SheetHeader>
        <TasksForm form={form} onSubmit={onSubmit}>
          <SheetFooter>
            <Button disabled={isLoading} type='submit'>
              Create Task
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
