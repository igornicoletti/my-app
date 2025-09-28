import { Button } from '@/components/ui/button'
import { SheetClose, SheetFooter } from '@/components/ui/sheet'
import { UserForm } from '@/features/app/user/components/form'
import { useUserCreate } from '@/features/app/user/lib/hook'
import type { UserSchemaCreate } from '@/features/app/user/lib/schema'
import { userSchemaCreate } from '@/features/app/user/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGapIcon } from '@phosphor-icons/react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'

interface UserCreateProps {
  onSuccess?: () => void
}

export const UserCreate = ({ onSuccess }: UserCreateProps) => {
  const form = useForm<UserSchemaCreate>({
    resolver: zodResolver(userSchemaCreate),
    defaultValues: {
      role: 'Manager',
      status: 'Pending',
    },
  })

  const { mutate: createUser, isPending } = useUserCreate({
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
