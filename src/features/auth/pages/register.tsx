import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGapIcon, UserPlusIcon } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'

import { InputField } from '@/components/form/input-field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { registerSchema, type RegisterSchema } from '@/features/auth/lib/schemas'
import { useSubmitForm } from '@/hooks/use-submit-form'
import { useToast } from '@/hooks/use-toast'
import { authService } from '@/services/auth-service'

export const RegisterPage = () => {
  const { successToast } = useToast()

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      displayName: ''
    }
  })

  const { onSubmit, isLoading } = useSubmitForm(async (data: RegisterSchema) => {
    await authService.createUserWithEmail(data.email, data.password, data.displayName)
    successToast('auth/account-created')
  }, `/login`)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className='grid gap-4'>
        <InputField
          control={form.control}
          disabled={isLoading}
          type='text'
          name='displayName'
          placeholder='Username'
          autoComplete='given-name'
          autoFocus />
        <InputField
          control={form.control}
          disabled={isLoading}
          type='email'
          name='email'
          placeholder='Email'
          autoComplete='username' />
        <InputField
          control={form.control}
          disabled={isLoading}
          type='password'
          name='password'
          placeholder='Password'
          autoComplete='new-password' />
        <InputField
          control={form.control}
          disabled={isLoading}
          type='password'
          name='confirmPassword'
          placeholder='Confirm password'
          autoComplete='new-password' />
        <Button disabled={isLoading} type='submit'>
          {isLoading ? (
            <SpinnerGapIcon className='animate-spin' />
          ) : (
            <UserPlusIcon />
          )}
          {!isLoading && 'Create account'}
        </Button>
      </form>
    </Form>
  )
}
