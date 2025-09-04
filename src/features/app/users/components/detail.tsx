import type { ComponentPropsWithRef } from 'react'

import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import type { TaskSchema } from '@/features/app/tasks/lib/schemas'

interface ViewTaskProps extends ComponentPropsWithRef<typeof Dialog> {
  task: TaskSchema | null
}

export const ViewTask = ({ task, ...props }: ViewTaskProps) => {
  if (!task) return null

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            {task.code}
            <Badge variant='secondary'>
              {task.label}
            </Badge>
          </DialogTitle>
          <DialogDescription className='text-left'>
            {task.title}
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <h4 className='text-sm'>Status</h4>
            <p className='text-sm text-muted-foreground'>{task.status}</p>
          </div>
          <div>
            <h4 className='text-sm'>Priority</h4>
            <p className='text-sm text-muted-foreground'>{task.priority}</p>
          </div>
          <div>
            <h4 className='text-sm'>Estimated Hours</h4>
            <p className='text-sm text-muted-foreground'>{task.estimatedHours}</p>
          </div>
          <div>
            <h4 className='text-sm'>Archived</h4>
            <p className='text-sm text-muted-foreground'>
              {task.archived ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
        <Separator />
        <div>
          <h4 className='text-sm'>Created At</h4>
          <p className='text-sm text-muted-foreground'>
            {task.createdAt.toLocaleString()}
          </p>
        </div>
        <div>
          <h4 className='text-sm'>Updated At</h4>
          <p className='text-sm text-muted-foreground'>
            {task.updatedAt.toLocaleString()}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
