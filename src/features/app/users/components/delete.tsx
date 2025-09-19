import { ConfirmDialog } from '@/components/common/confirm-dialog'
import { useDeleteUsers } from '@/features/app/users/lib/hooks'
import type { UserSchema } from '@/features/app/users/lib/schemas'
import type { Row } from '@tanstack/react-table'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

interface DeleteUsersProps extends Omit<ComponentPropsWithoutRef<typeof ConfirmDialog>, 'children'> {
  users: Row<UserSchema>['original'][]
  trigger?: ReactNode
  onSuccess?: () => void
}

export const DeleteUsers = ({ users, trigger, onSuccess, ...props }: DeleteUsersProps) => {
  const deleteUsers = useDeleteUsers({
    onSuccess: () => {
      onSuccess?.()
    },
  })

  return (
    <ConfirmDialog
      {...props}
      trigger={trigger}
      onConfirm={() => deleteUsers.mutate(users.map((u) => u.id))} />
  )
}
