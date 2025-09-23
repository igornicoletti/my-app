import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { TaskSchema } from '@/features/app/task/lib/schemas'
import type { ComponentPropsWithRef } from 'react'

interface ViewTaskProps extends ComponentPropsWithRef<typeof Dialog> {
  task: TaskSchema | null
}

export const ViewTask = ({ task, ...props }: ViewTaskProps) => {
  if (!task) return null

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
          <DialogDescription>
            Detailed information about the selected task
          </DialogDescription>
        </DialogHeader>
        <dl className='grid gap-3 sm:grid-cols-2'>
          <div className='sm:col-span-2'>
            <dt className='text-sm font-medium'>Title</dt>
            <dd className='text-sm text-muted-foreground'>{task.title}</dd>
          </div>
          <div>
            <dt className='text-sm font-medium'>Code</dt>
            <dd className='text-sm text-muted-foreground'>{task.code}</dd>
          </div>
          <div>
            <dt className='text-sm font-medium'>Label</dt>
            <dd className='text-sm text-muted-foreground'>{task.label}</dd>
          </div>
          <div>
            <dt className='text-sm font-medium'>Status</dt>
            <dd className='text-sm text-muted-foreground'>{task.status}</dd>
          </div>
          <div>
            <dt className='text-sm font-medium'>Priority</dt>
            <dd className='text-sm text-muted-foreground'>{task.priority}</dd>
          </div>
          <div>
            <dt className='text-sm font-medium'>Estimated Hours</dt>
            <dd className='text-sm text-muted-foreground'>{task.estimatedHours}</dd>
          </div>
          <div>
            <dt className='text-sm font-medium'>Archived</dt>
            <dd className='text-sm text-muted-foreground'>{task.archived ? 'Yes' : 'No'}</dd>
          </div>
          <div>
            <dt className='text-sm font-medium'>Created At</dt>
            <dd className='text-sm text-muted-foreground'>
              {task.createdAt.toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className='text-sm font-medium'>Updated At</dt>
            <dd className='text-sm text-muted-foreground'>
              {task.updatedAt.toLocaleString()}
            </dd>
          </div>
        </dl>
      </DialogContent>
    </Dialog>
  )
}
