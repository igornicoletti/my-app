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
import { useDeleteUsers } from '@/features/app/users/hooks/use-users-mutations'
import type { UserSchema } from '@/features/app/users/lib/schemas'
import { useMediaQuery } from '@/hooks/use-media-query'
import { TrashSimpleIcon } from '@phosphor-icons/react'
import type { Row } from '@tanstack/react-table'
import type { ComponentPropsWithoutRef } from 'react'

interface DeleteUsersProps extends ComponentPropsWithoutRef<typeof Dialog> {
  users: Row<UserSchema>['original'][]
  showTrigger?: boolean
  onSuccess?: () => void
}

export const DeleteUsers = ({
  users,
  showTrigger = true,
  onSuccess,
  ...props
}: DeleteUsersProps) => {
  const deleteUsersMutation = useDeleteUsers({
    onSuccess: () => {
      onSuccess?.()
      props.onOpenChange?.(false)
    },
  })

  const onDelete = () => {
    deleteUsersMutation.mutate(users.map((user) => user.id))
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
          <Description>This action cannot be undone.</Description>
        </Header>
        <Footer>
          <Close asChild>
            <Button type='button' variant='secondary'>
              Cancel
            </Button>
          </Close>
          <Button
            variant='destructive'
            onClick={onDelete}
            disabled={deleteUsersMutation.isPending}>
            Delete
          </Button>
        </Footer>
      </Content>
    </Component>
  )
}
