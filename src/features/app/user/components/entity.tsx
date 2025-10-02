import { CommonEntity } from '@/components/common/entity'
import { UserCreate } from '@/features/app/user/components/create'
import { UserUpdate } from '@/features/app/user/components/update'
import type { UserSchema } from '@/features/app/user/lib/schema'
import type { ReactNode } from 'react'

type UserEntityProps = {
  user?: UserSchema | null
  trigger?: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const UserEntity = ({ user, onOpenChange, ...props }: UserEntityProps) => {
  const isEditMode = !!user

  return (
    <CommonEntity
      {...props}
      onOpenChange={onOpenChange}
      onModeSuccess={() => onOpenChange?.(false)}
      createMode={{
        title: 'Create user',
        description: 'Fill in the details below to create a new user.',
      }}
      updateMode={isEditMode ? {
        data: user,
        title: 'Update user',
        description: 'Update the user details and save the changes.',
      } : undefined}>
      {({ onSuccess, data }) => (
        data
          ? <UserUpdate user={data} onSuccess={onSuccess} />
          : <UserCreate onSuccess={onSuccess} />
      )}
    </CommonEntity>
  )
}
