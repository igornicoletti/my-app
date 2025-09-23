import { Button } from '@/components/ui/button'
import { SheetClose, SheetFooter } from '@/components/ui/sheet'
import { UserForm } from '@/features/app/user/components/form'
import { useUpdateUser } from '@/features/app/user/lib/hooks'
import type { UpdateUserSchema, UserSchema } from '@/features/app/user/lib/schemas'
import { updateUserSchema } from '@/features/app/user/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGapIcon } from '@phosphor-icons/react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'

interface UpdateUserProps {
  user: UserSchema
  onSuccess?: (data?: UserSchema) => void
}

export const UpdateUser = ({ user, onSuccess }: UpdateUserProps) => {
  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
    },
  })

  const { mutate: updateUser, isPending } = useUpdateUser({
    onSuccess: (data) => {
      onSuccess?.(data)
    },
  })

  const onSubmit = (values: UpdateUserSchema) => updateUser({ id: user.id, ...values })

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
