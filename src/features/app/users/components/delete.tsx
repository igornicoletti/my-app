import { CommonConfirm } from '@/components/common/confirm'
import { useDeleteUsers } from '@/features/app/users/lib/hooks'
import type { UserSchema } from '@/features/app/users/lib/schemas'
import type { Row } from '@tanstack/react-table'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

interface DeleteUsersProps extends Omit<ComponentPropsWithoutRef<typeof CommonConfirm>, 'children'> {
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
    <CommonConfirm
      {...props}
      trigger={trigger}
      onConfirm={() => deleteUsers.mutate(users.map((u) => u.id))} />
  )
}
