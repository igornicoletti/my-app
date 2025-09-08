import type { ComponentPropsWithRef } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import type { TaskSchema } from '@/features/app/tasks/lib/schemas'

interface ViewTaskProps extends ComponentPropsWithRef<typeof Dialog> {
  task: TaskSchema | null
}

export const ViewTask = ({ task, ...props }: ViewTaskProps) => {
  if (!task) return null

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader className='sm:text-center'>
          <DialogTitle>{task.code}</DialogTitle>
          <DialogDescription>{task.title}</DialogDescription>
        </DialogHeader>
        <div className='grid gap-2'>
          <h4 className='text-sm'>Label:{' '}
            <span className='text-muted-foreground'>{task.label}</span>
          </h4>
          <h4 className='text-sm'>Status:{' '}
            <span className='text-muted-foreground'>{task.status}</span>
          </h4>
          <h4 className='text-sm'>Priority:{' '}
            <span className='text-muted-foreground'>{task.priority}</span>
          </h4>
          <h4 className='text-sm'>Estimated Hours:{' '}
            <span className='text-muted-foreground'>{task.estimatedHours}</span>
          </h4>
          <h4 className='text-sm'>Archived:{' '}
            <span className='text-muted-foreground'>{task.archived ? 'Yes' : 'No'}</span>
          </h4>
          <h4 className='text-sm'>Created At:{' '}
            <span className='text-muted-foreground'>{task.createdAt.toLocaleString()}</span>
          </h4>
          <h4 className='text-sm'>Updated At:{' '}
            <span className='text-muted-foreground'>{task.updatedAt.toLocaleString()}</span>
          </h4>
        </div>
      </DialogContent>
    </Dialog>
  )
}
