import { zodResolver } from '@hookform/resolvers/zod'
import { SparkleIcon, SpinnerGapIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { UserForm } from '@/features/app/users/components/form'
import { useCreateUser } from '@/features/app/users/hooks/use-users-mutations'
import { createUserSchema, type CreateUserSchema } from '@/features/app/users/lib/schemas'

export const CreateUser = () => {
  const [open, setOpen] = useState(false)

  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema)
  })

  const createUserMutation = useCreateUser({
    onSuccess: () => {
      form.reset()
      setOpen(false)
    }
  })

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='secondary' size='sm'>
          <SparkleIcon />
          Create
        </Button>
      </SheetTrigger>
      <SheetContent className='w-full sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>Create User</SheetTitle>
          <SheetDescription>
            Fill in the details below to create a new user.
          </SheetDescription>
        </SheetHeader>
        <UserForm form={form} onSubmit={createUserMutation.mutate}>
          <SheetFooter className='mt-auto'>
            <Button
              type='submit'
              disabled={createUserMutation.isPending}>
              {createUserMutation.isPending ? (
                <SpinnerGapIcon className='animate-spin' />
              ) : (
                'Save User'
              )}
            </Button>
            <SheetClose asChild>
              <Button type='button' variant='secondary'>
                Cancel
              </Button>
            </SheetClose>
          </SheetFooter>
        </UserForm>
      </SheetContent>
    </Sheet>
  )
}
