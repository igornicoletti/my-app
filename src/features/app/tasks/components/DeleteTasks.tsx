import type { Row } from '@tanstack/react-table'
import {
  useTransition,
  type ComponentPropsWithoutRef
} from 'react'
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
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import type { TaskSchema as Task } from '@/features/app/tasks/api'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { SpinnerIcon, TrashIcon } from '@phosphor-icons/react'

interface DeleteTasksDialogProps extends ComponentPropsWithoutRef<typeof Dialog> {
  tasks: Row<Task>['original'][]
  showTrigger?: boolean
  onSuccess?: () => void
}

export const DeleteTasksDialog = ({
  tasks,
  showTrigger = true,
  onSuccess,
  ...props
}: DeleteTasksDialogProps) => {
  const [isDeletePending, startDeleteTransition] = useTransition()
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const onDelete = () => {
    startDeleteTransition(async () => {
      await new Promise(res => setTimeout(res, 500))
      toast.success(`${tasks.length} task${tasks.length > 1 ? 's' : ''} deleted`)
      props.onOpenChange?.(false)
      onSuccess?.()
    })
  }

  const DeleteButton = (
    <Button
      aria-label='Delete selected rows'
      variant='destructive'
      onClick={onDelete}
      disabled={isDeletePending}>
      {isDeletePending && (
        <SpinnerIcon className='mr-2 animate-spin' aria-hidden='true' />
      )}
      Delete
    </Button>
  )

  if (isDesktop) {
    return (
      <Dialog {...props}>
        {showTrigger ? (
          <DialogTrigger asChild>
            <Button variant='outline' size='sm'>
              <TrashIcon weight='bold' className='mr-2' aria-hidden='true' />
              Delete ({tasks.length})
            </Button>
          </DialogTrigger>
        ) : null}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your{' '}
              <span className='font-semibold'>{tasks.length}</span>
              {tasks.length === 1 ? ' task' : ' tasks'}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='gap-2 sm:space-x-0'>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            {DeleteButton}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer {...props}>
      {showTrigger ? (
        <DrawerTrigger asChild>
          <Button variant='outline' size='sm'>
            <TrashIcon weight='bold' className='mr-2' aria-hidden='true' />
            Delete ({tasks.length})
          </Button>
        </DrawerTrigger>
      ) : null}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. This will permanently delete your{' '}
            <span className='font-semibold'>{tasks.length}</span>
            {tasks.length === 1 ? ' task' : ' tasks'}.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className='gap-2 sm:space-x-0'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
          {DeleteButton}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
