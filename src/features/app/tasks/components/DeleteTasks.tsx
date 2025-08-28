import { SpinnerGapIcon, TrashIcon } from '@phosphor-icons/react'
import type { Row } from '@tanstack/react-table'
import { useTransition, type ComponentPropsWithoutRef } from 'react'
import { toast } from 'sonner'

import { Badge, Separator } from '@/components'
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

export const DeleteTasks = ({
  tasks,
  showTrigger = true,
  onSuccess,
  ...props
}: DeleteTasksProps) => {
  const [isPending, startTransition] = useTransition()
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const onDelete = () => {
    startTransition(async () => {
      const { error } = await deleteTasks({
        ids: tasks.map((task) => task.id)
      })

      if (error) {
        toast.error(error)
        return
      }

      props.onOpenChange?.(false)
      toast.success(`${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'} deleted`)
      onSuccess?.()
    })
  }

  return isDesktop ? (
    <Dialog {...props}>
      {showTrigger && (
        <DialogTrigger asChild>
          <Button variant='outline' size='sm'>
            <TrashIcon aria-hidden='true' />
            Delete
            <Separator orientation='vertical' className='mx-0.5 data-[orientation=vertical]:h-4' />
            <Badge variant='secondary' className='rounded-sm px-1 font-normal'>
              {tasks.length}
            </Badge>
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
            disabled={isPending}>
            {isPending && <SpinnerGapIcon className='animate-spin' aria-hidden='true' />}
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
            Delete
            <Separator orientation='vertical' className='mx-0.5 data-[orientation=vertical]:h-4' />
            <Badge variant='secondary' className='rounded-sm px-1 font-normal'>
              {tasks.length}
            </Badge>
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
            disabled={isPending}>
            {isPending && <SpinnerGapIcon className='animate-spin' aria-hidden='true' />}
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
