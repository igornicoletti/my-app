import { TrashIcon } from '@phosphor-icons/react'
import type { Row } from '@tanstack/react-table'
import { useTransition, type ComponentPropsWithoutRef } from 'react'

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
import type { TaskSchema as Task } from '@/features/app/tasks/api'
import { useToast } from '@/hooks'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface DeleteTasksProps extends ComponentPropsWithoutRef<typeof Dialog> {
  tasks: Row<Task>['original'][]
  showTrigger?: boolean
  onSuccess?: () => void
}

export const DeleteTasks = ({
  tasks,
  showTrigger = true,
  onSuccess,
  ...props
}: DeleteTasksProps) => {
  const [isDeletePending, startDeleteTransition] = useTransition()
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const { successToast } = useToast()

  const onDelete = () => {
    startDeleteTransition(async () => {
      await new Promise(res => setTimeout(res, 500))
      successToast({
        title: 'Task Deleted!',
        description: `${tasks.length} task has been successfully deleted.`,
      })
      props.onOpenChange?.(false)
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
            This action cannot be undone. This will permanently remove the data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button onClick={onDelete} disabled={isDeletePending} variant='destructive'>
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
            This action cannot be undone. This will permanently remove the data from our servers.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
          <Button onClick={onDelete} disabled={isDeletePending} variant='destructive'>
            Delete
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
