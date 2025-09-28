import { Button } from '@/components/ui/button'
import { SheetClose, SheetFooter } from '@/components/ui/sheet'
import { UserForm } from '@/features/app/user/components/form'
import { useUserUpdate } from '@/features/app/user/lib/hook'
import type { UserSchema, UserSchemaUpdate } from '@/features/app/user/lib/schema'
import { userSchemaUpdate } from '@/features/app/user/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGapIcon } from '@phosphor-icons/react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'

interface UserUpdateProps {
  user: UserSchema
  onSuccess?: (data?: UserSchema) => void
}

export const UserUpdate = ({ user, onSuccess }: UserUpdateProps) => {
  const form = useForm<UserSchemaUpdate>({
    resolver: zodResolver(userSchemaUpdate),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
    },
  })

  const { mutate: updateUser, isPending } = useUserUpdate({
    onSuccess: (data) => {
      onSuccess?.(data)
    },
  })

  const onSubmit = (values: UserSchemaUpdate) => updateUser({ id: user.id, ...values })

  return (
    <UserForm form={form} onSubmit={onSubmit as (values: FieldValues) => void}>
      <SheetFooter>
        <SheetClose asChild>
          <Button type='button' variant='outline'>
            Cancel
          </Button>
        </SheetClose>
        <Button disabled={isPending} type='submit'>
          {isPending ? <SpinnerGapIcon className='animate-spin' /> : 'Save'}
        </Button>
      </SheetFooter>
    </UserForm>
  )
}
