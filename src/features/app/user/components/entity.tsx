import { CommonEntity } from '@/components/common/entity'
import { CreateUser } from '@/features/app/user/components/create'
import { UpdateUser } from '@/features/app/user/components/update'
import type { UserSchema } from '@/features/app/user/lib/schemas'
import type { ComponentPropsWithoutRef } from 'react'

type UserEntityProps = Omit<ComponentPropsWithoutRef<typeof CommonEntity<UserSchema>>, 'createMode' | 'updateMode'> & {
  user?: UserSchema | null
}

export const UserEntity = ({ user, ...props }: UserEntityProps) => {
  const isEditMode = !!user

  const commonProps = {
    open: props.open,
    onOpenChange: props.onOpenChange,
    trigger: props.trigger,
  }

  const createMode = {
    title: 'Create user',
    description: 'Fill in the details below to create a new user.',
    formComponent: <CreateUser />,
  }

  const updateMode = isEditMode ? {
    data: user,
    title: 'Update user',
    description: 'Update the user details and save the changes.',
    formComponent: <UpdateUser user={user!} />,
  } : undefined

  const onModeSuccess = () => {
    props.onOpenChange?.(false)
  }

  return <CommonEntity
    {...commonProps}
    createMode={createMode}
    updateMode={updateMode}
    onModeSuccess={onModeSuccess} />
}
