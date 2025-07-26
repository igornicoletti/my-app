import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGapIcon, UserPlusIcon } from '@phosphor-icons/react'

import { registerSchema, type RegisterProps } from '@/features/auth'

import { Button, FieldControl, Form } from '@/components'
import { useSubmit, useToast } from '@/hooks'
import { authService } from '@/services'

export const Register = () => {
  const { successToast } = useToast()

  const form = useForm<RegisterProps>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '', displayName: '' }
  })

  const { onSubmit, isLoading } = useSubmit(async (data: RegisterProps) => {
    await authService.createUserWithEmail(data.email, data.password, data.displayName)
    successToast('auth/account-created')
  }, `/login`)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className='grid gap-4'>
        <FieldControl control={form.control} disabled={isLoading} type='text' name='displayName' placeholder='Username' autoComplete='given-name' autoFocus />
        <FieldControl control={form.control} disabled={isLoading} type='email' name='email' placeholder='Email' autoComplete='username' />
        <FieldControl control={form.control} disabled={isLoading} type='password' name='password' placeholder='Password' autoComplete='new-password' />
        <FieldControl control={form.control} disabled={isLoading} type='password' name='confirmPassword' placeholder='Confirm password' autoComplete='new-password' />
        <Button disabled={isLoading} type='submit'>
          {isLoading ? (<SpinnerGapIcon className='animate-spin' />) : (<UserPlusIcon />)}
          {isLoading ? '' : 'Create account'}
        </Button>
      </form>
    </Form>
  )
}
