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
import { useCreateUser, useUpdateUser } from '@/features/app/users/lib/hooks'
import {
  type CreateUserSchema,
  createUserSchema,
  type UpdateUserSchema,
  updateUserSchema,
  type UserSchema,
} from '@/features/app/users/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGapIcon } from '@phosphor-icons/react'
import { type ComponentPropsWithoutRef, type ReactNode, useEffect } from 'react'
import { type FieldValues, useForm, type UseFormReturn } from 'react-hook-form'

interface UserFormLayoutProps<T extends FieldValues> {
  form: UseFormReturn<T>
  onSubmit: (values: T) => void
  isPending: boolean
}

const UserFormLayout = <T extends FieldValues>({
  form,
  onSubmit,
  isPending,
}: UserFormLayoutProps<T>) => (
  <UserForm form={form} onSubmit={onSubmit}>
    <SheetFooter className='pt-4'>
      <SheetClose asChild>
        <Button type='button' variant='outline'>Cancel</Button>
      </SheetClose>
      <Button disabled={isPending} type='submit'>
        {isPending ? <SpinnerGapIcon className='animate-spin' /> : 'Save Changes'}
      </Button>
    </SheetFooter>
  </UserForm>
)

interface CreateUserFormProps { onSuccess: () => void }

const CreateUserForm = ({ onSuccess }: CreateUserFormProps) => {
  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: 'Cashier',
      status: 'Active',
    }
  })
  const { mutate: createUser, isPending } = useCreateUser({
    onSuccess: () => { form.reset(); onSuccess() },
  })
  return <UserFormLayout form={form} onSubmit={createUser} isPending={isPending} />
}

interface UpdateUserFormProps { user: UserSchema; onSuccess: (data: UserSchema) => void }

const UpdateUserForm = ({ user, onSuccess }: UpdateUserFormProps) => {
  const form = useForm<UpdateUserSchema>({ resolver: zodResolver(updateUserSchema) })

  useEffect(() => {
    form.reset({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
    })
  }, [user, form])

  const { mutate: updateUser, isPending } = useUpdateUser({ onSuccess })
  const onSubmit = (values: UpdateUserSchema) => updateUser({ id: user.id, ...values })

  return <UserFormLayout form={form} onSubmit={onSubmit} isPending={isPending} />
}

type UserSheetProps = Omit<ComponentPropsWithoutRef<typeof Sheet>, 'children'> & {
  user?: UserSchema | null
  trigger?: ReactNode
}

export const UserSheet = ({ user, trigger, onOpenChange, ...props }: UserSheetProps) => {
  const isEditMode = !!user
  const handleSuccess = () => onOpenChange?.(false)

  return (
    <Sheet onOpenChange={onOpenChange} {...props}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent className='w-full sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>{isEditMode ? 'Update User' : 'Create User'}</SheetTitle>
          <SheetDescription>
            {isEditMode
              ? 'Update the user details and save the changes.'
              : 'Fill in the details below to create a new user.'}
          </SheetDescription>
        </SheetHeader>
        {isEditMode
          ? <UpdateUserForm user={user} onSuccess={handleSuccess} />
          : <CreateUserForm onSuccess={handleSuccess} />
        }
      </SheetContent>
    </Sheet>
  )
}
