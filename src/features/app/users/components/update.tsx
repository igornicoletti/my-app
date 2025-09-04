import { zodResolver } from '@hookform/resolvers/zod'
import type { ComponentPropsWithRef } from 'react'
import { useEffect } from 'react'
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
} from '@/components/ui/sheet'
import { UserForm } from '@/features/app/users/components/form'
import { useUpdateUser } from '@/features/app/users/hooks/use-users-mutations'
import { updateUserSchema, type UpdateUserSchema, type UserSchema } from '@/features/app/users/lib/schemas'
import { SpinnerGapIcon } from '@phosphor-icons/react'

interface UpdateUserProps extends ComponentPropsWithRef<typeof Sheet> {
  user: UserSchema | null
}

export const UpdateUser = ({ user, ...props }: UpdateUserProps) => {
  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema)
  })

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      })
    }
  }, [user, form])

  const updateUserMutation = useUpdateUser({
    onSuccess: (data) => {
      form.reset(data)
      props.onOpenChange?.(false)
    },
  })

  const onSubmit = (input: UpdateUserSchema) => {
    if (!user) return
    updateUserMutation.mutate({ id: user.id, ...input })
  }

  return (
    <Sheet {...props}>
      <SheetContent className='w-full sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>Update User</SheetTitle>
          <SheetDescription>
            Update the user details and save the changes.
          </SheetDescription>
        </SheetHeader>
        <UserForm form={form} onSubmit={onSubmit}>
          <SheetFooter>
            <Button
              type='submit'
              disabled={updateUserMutation.isPending}>
              {updateUserMutation.isPending ? (
                <SpinnerGapIcon className='animate-spin' />
              ) : (
                'Save Changes'
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
