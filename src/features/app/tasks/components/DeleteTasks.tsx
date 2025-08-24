import { SpinnerGapIcon, TrashIcon } from '@phosphor-icons/react'
import type { Row } from '@tanstack/react-table'
import { useEffect, type ComponentPropsWithoutRef } from 'react'
import { useFetcher } from 'react-router-dom'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import type { TaskSchema } from '@/features/app/tasks/lib/schema'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface DeleteTasksProps extends ComponentPropsWithoutRef<typeof Dialog> {
  tasks: Row<TaskSchema>['original'][]
  showTrigger?: boolean
  onSuccess?: () => void
}

export const DeleteTasks = ({ tasks, showTrigger = true, onSuccess, ...props }: DeleteTasksProps) => {
  const fetcher = useFetcher()
  const isDeletePending = fetcher.state !== 'idle'
  const isDesktop = useMediaQuery('(min-width: 640px)')

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      if (!fetcher.data.error) {
        toast.success('Tasks deleted')
        props.onOpenChange?.(false)
        onSuccess?.()
      } else {
        toast.error(fetcher.data.error)
      }
    }
  }, [fetcher.state, fetcher.data, props.onOpenChange, onSuccess])

  const onDelete = () => {
    const formData = new FormData()
    const intent = tasks.length > 1 ? 'deleteTasks' : 'deleteTask'
    formData.append('intent', intent)

    if (tasks.length > 1) {
      tasks.forEach(task => formData.append('ids', task.id))
    } else {
      formData.append('id', tasks[0]?.id)
    }

    fetcher.submit(formData, { method: 'POST' })
  }


  return isDesktop ? (
    <Dialog {...props}>
      {showTrigger && (
        <DialogTrigger asChild>
          <Button variant='outline' size='sm'>
            <TrashIcon aria-hidden='true' />
            Delete ({tasks.length})
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your{' '}
            <span className='font-semibold'>{tasks.length}</span>
            {tasks.length === 1 ? ' task' : ' tasks'} from our system.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button
            aria-label='Delete selected rows'
            variant='destructive'
            onClick={onDelete}
            disabled={isDeletePending}>
            {isDeletePending && <SpinnerGapIcon className='animate-spin' />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer {...props}>
      {showTrigger && (
        <DrawerTrigger asChild>
          <Button variant='outline' size='sm'>
            <TrashIcon aria-hidden='true' />
            Delete ({tasks.length})
          </Button>
        </DrawerTrigger>
      )}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. This will permanently delete your{' '}
            <span className='font-semibold'>{tasks.length}</span>
            {tasks.length === 1 ? ' task' : ' tasks'} from our system.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button
            aria-label='Delete selected rows'
            variant='destructive'
            onClick={onDelete}
            disabled={isDeletePending}>
            {isDeletePending && <SpinnerGapIcon className='animate-spin' />}
            Delete
          </Button>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
