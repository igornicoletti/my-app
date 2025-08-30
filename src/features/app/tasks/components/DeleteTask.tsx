import { TrashSimpleIcon } from '@phosphor-icons/react'
import type { Row } from '@tanstack/react-table'
import type { ComponentPropsWithoutRef } from 'react'

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
import { useDeleteTasks } from '@/features/app/tasks/hooks/useTasksMutations'
import type { TaskSchema } from '@/features/app/tasks/lib/types'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface DeleteTasksProps extends ComponentPropsWithoutRef<typeof Dialog> {
  tasks: Row<TaskSchema>['original'][]
  showTrigger?: boolean
  onSuccess?: () => void
}

export const DeleteTask = ({
  tasks,
  showTrigger = true,
  onSuccess,
  ...props
}: DeleteTasksProps) => {
  const deleteTasksMutation = useDeleteTasks({
    onSuccess: () => {
      onSuccess?.()
      props.onOpenChange?.(false)
    },
  })

  const onDelete = () => {
    deleteTasksMutation.mutate(tasks.map((task) => task.id))
  }

  const isDesktop = useMediaQuery('(min-width: 640px)')
  const Component = isDesktop ? Dialog : Drawer
  const Trigger = isDesktop ? DialogTrigger : DrawerTrigger
  const Content = isDesktop ? DialogContent : DrawerContent
  const Header = isDesktop ? DialogHeader : DrawerHeader
  const Title = isDesktop ? DialogTitle : DrawerTitle
  const Description = isDesktop ? DialogDescription : DrawerDescription
  const Footer = isDesktop ? DialogFooter : DrawerFooter
  const Close = isDesktop ? DialogClose : DrawerClose

  return (
    <Component {...props}>
      {showTrigger && (
        <Trigger asChild>
          <Button variant='secondary' size='sm'>
            <TrashSimpleIcon aria-hidden='true' />
            Delete
          </Button>
        </Trigger>
      )}
      <Content>
        <Header>
          <Title>Are you absolutely sure?</Title>
          <Description>
            This action cannot be undone. This will permanently delete your{' '}
            <span className='font-semibold'>{tasks.length}</span>
            {tasks.length === 1 ? ' task' : ' tasks'} from our system.
          </Description>
        </Header>
        <Footer>
          <Close asChild>
            <Button variant='outline'>Cancel</Button>
          </Close>
          <Button
            variant='destructive'
            onClick={onDelete}
            disabled={deleteTasksMutation.isPending}>
            Delete
          </Button>
        </Footer>
      </Content>
    </Component>
  )
}
