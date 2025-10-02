import { CommonConfirm } from '@/components/common/confirm'
import { useUserDelete } from '@/features/app/user/lib/hook'
import type { UserSchema } from '@/features/app/user/lib/schema'
import type { Row } from '@tanstack/react-table'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

interface UserDeleteProps extends Omit<ComponentPropsWithoutRef<typeof CommonConfirm>, 'onConfirm' | 'title' | 'description' | 'children'> {
  users: Row<UserSchema>['original'][]
  trigger?: ReactNode
  onSuccess?: () => void
}

export const UserDelete = ({ users, trigger, onSuccess, ...props }: UserDeleteProps) => {
  const deleteUsersMutation = useUserDelete({
    onSuccess: () => {
      onSuccess?.()
    },
  })

  const userCount = users.length
  const title = `Are you absolutely sure?`
  const description = `This action cannot be undone. It will permanently delete ${userCount > 1 ? `${userCount} users` : 'user'} from our server.`

  const handleConfirm = () => {
    const userIds = users.map((u) => u.id)
    return deleteUsersMutation.mutateAsync(userIds)
  }

  return (
    <CommonConfirm
      title={title}
      description={description}
      trigger={trigger}
      onConfirm={handleConfirm}
      {...props} />
  )
}
