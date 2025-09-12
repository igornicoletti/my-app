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
import { useDeleteTasks } from '@/features/app/tasks/lib/hooks'
import type { TaskSchema } from '@/features/app/tasks/lib/schemas'
import { useMediaQuery } from '@/hooks/use-media-query'
import { TrashSimpleIcon } from '@phosphor-icons/react'
import type { Row } from '@tanstack/react-table'
import type { ComponentPropsWithoutRef } from 'react'

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
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const deleteTasks = useDeleteTasks({
    onSuccess: () => {
      onSuccess?.()
      props.onOpenChange?.(false)
    }
  })

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
          <Description>This action cannot be undone.</Description>
        </Header>
        <Footer>
          <Close asChild>
            <Button variant='outline'>Cancel</Button>
          </Close>
          <Button
            onClick={() => deleteTasks.mutate(tasks.map((task) => task.id))}
            disabled={deleteTasks.isPending}>
            Continue
          </Button>
        </Footer>
      </Content>
    </Component>
  )
}
