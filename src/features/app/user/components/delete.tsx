import { CommonConfirm } from '@/components/common/confirm'
import { useUserDelete } from '@/features/app/user/lib/hook'
import type { UserSchema } from '@/features/app/user/lib/schema'
import type { Row } from '@tanstack/react-table'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

interface UserDeleteProps extends Omit<ComponentPropsWithoutRef<typeof CommonConfirm>, 'children'> {
  users: Row<UserSchema>['original'][]
  trigger?: ReactNode
  onSuccess?: () => void
}

export const UserDelete = ({ users, trigger, onSuccess, ...props }: UserDeleteProps) => {
  const deleteUsers = useUserDelete({
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
