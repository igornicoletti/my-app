import { SpinnerGapIcon, TrashIcon } from '@phosphor-icons/react'
import type { Row } from '@tanstack/react-table'
import { useTransition, type ComponentPropsWithoutRef } from 'react'
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
import { deleteTasks } from '@/features/app/tasks/lib/actions'
import type { TaskSchema } from '@/features/app/tasks/lib/schema'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface DeleteTasksProps extends ComponentPropsWithoutRef<typeof Dialog> {
  tasks: Row<TaskSchema>['original'][]
  showTrigger?: boolean
  onSuccess?: () => void
}

export const DeleteTasks = ({ tasks, showTrigger = true, onSuccess, ...props }: DeleteTasksProps) => {
  const [isDeletePending, startDeleteTransition] = useTransition()
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const onDelete = () => {
    startDeleteTransition(async () => {
      const { error } = await deleteTasks({
        ids: tasks.map((task) => task.id),
      })

      if (error) {
        toast.error(error)
        return
      }

      props.onOpenChange?.(false)
      toast.success('Tasks deleted')
      onSuccess?.()
    })
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
