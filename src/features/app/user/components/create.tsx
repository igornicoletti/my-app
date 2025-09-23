import { Button } from '@/components/ui/button'
import { SheetClose, SheetFooter } from '@/components/ui/sheet'
import { UserForm } from '@/features/app/user/components/form'
import { useCreateUser } from '@/features/app/user/lib/hooks'
import type { CreateUserSchema } from '@/features/app/user/lib/schemas'
import { createUserSchema } from '@/features/app/user/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGapIcon } from '@phosphor-icons/react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'

interface CreateUserProps {
  onSuccess?: () => void
}

export const CreateUser = ({ onSuccess }: CreateUserProps) => {
  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      role: 'Manager',
      status: 'Pending',
    },
  })

  const { mutate: createUser, isPending } = useCreateUser({
    onSuccess: () => {
      form.reset()
      onSuccess?.()
    },
  })

  return (
    <UserForm form={form} onSubmit={createUser as (values: FieldValues) => void}>
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
