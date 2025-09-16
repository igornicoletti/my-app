import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from '@/components/ui/sheet'
import { TaskForm } from '@/features/app/tasks/components/form'
import { useCreateTask, useUpdateTask } from '@/features/app/tasks/lib/hooks'
import { type CreateTaskSchema, createTaskSchema, type TaskSchema, type UpdateTaskSchema, updateTaskSchema } from '@/features/app/tasks/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGapIcon } from '@phosphor-icons/react'
import { type ComponentPropsWithoutRef, type ReactNode, useEffect } from 'react'
import { type FieldValues, useForm, type UseFormReturn } from 'react-hook-form'

interface TaskFormLayoutProps<T extends FieldValues> {
  form: UseFormReturn<T, any>
  onSubmit: (values: T) => void
  isPending: boolean
}

const TaskFormLayout = <T extends FieldValues>({
  form,
  onSubmit,
  isPending,
}: TaskFormLayoutProps<T>) => (
  <TaskForm form={form} onSubmit={onSubmit}>
    <SheetFooter>
      <SheetClose asChild>
        <Button type='button' variant='outline'>Cancel</Button>
      </SheetClose>
      <Button disabled={isPending} type='submit'>
        {isPending ? <SpinnerGapIcon className='animate-spin' /> : 'Save'}
      </Button>
    </SheetFooter>
  </TaskForm>
)

interface CreateTaskFormProps { onSuccess: () => void }

const CreateTaskForm = ({ onSuccess }: CreateTaskFormProps) => {
  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: { title: '', status: 'Todo', label: 'Feature', priority: 'Medium', estimatedHours: 1 }
  })

  const { mutate: createTask, isPending } = useCreateTask({
    onSuccess: () => { form.reset(); onSuccess() },
  })

  return <TaskFormLayout form={form} onSubmit={createTask} isPending={isPending} />
}

interface UpdateTaskFormProps { task: TaskSchema; onSuccess: (data: TaskSchema) => void }

const UpdateTaskForm = ({ task, onSuccess }: UpdateTaskFormProps) => {
  const form = useForm<UpdateTaskSchema>({ resolver: zodResolver(updateTaskSchema) })

  useEffect(() => {
    form.reset({
      title: task.title, label: task.label, status: task.status, priority: task.priority, estimatedHours: task.estimatedHours,
    })
  }, [task, form])

  const { mutate: updateTask, isPending } = useUpdateTask({ onSuccess })
  const onSubmit = (values: UpdateTaskSchema) => updateTask({ id: task.id, ...values })

  return <TaskFormLayout form={form} onSubmit={onSubmit} isPending={isPending} />
}

type TaskSheetProps = Omit<ComponentPropsWithoutRef<typeof Sheet>, 'children'> & {
  task?: TaskSchema | null
  trigger?: ReactNode
}

export const TaskSheet = ({ task, trigger, onOpenChange, ...props }: TaskSheetProps) => {
  const isEditMode = !!task
  const handleSuccess = () => onOpenChange?.(false)

  return (
    <Sheet onOpenChange={onOpenChange} {...props}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent className='w-full sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>{isEditMode ? 'Update task' : 'Create task'}</SheetTitle>
          <SheetDescription>
            {isEditMode
              ? 'Update the task details and save the changes.'
              : 'Fill in the details below to create a new task.'}
          </SheetDescription>
        </SheetHeader>
        {isEditMode
          ? <UpdateTaskForm task={task} onSuccess={handleSuccess} />
          : <CreateTaskForm onSuccess={handleSuccess} />
        }
      </SheetContent>
    </Sheet>
  )
}
