import { zodResolver } from '@hookform/resolvers/zod'
import { GoogleLogoIcon, SignInIcon, SpinnerGapIcon } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { InputField } from '@/components/form'
import { Button, Form, Separator } from '@/components/ui'
import { loginSchema, type LoginSchema } from '@/features/auth'
import { useSubmitForm, useToast } from '@/hooks'
import { authService } from '@/services'

export const LoginPage = () => {
  const { successToast } = useToast()

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  })

  const { onSubmit, isLoading } = useSubmitForm(async (data: LoginSchema) => {
    await authService.signInWithEmail(data.email, data.password)
    await authService.getCurrentUser()?.reload()
    const updatedUser = authService.getCurrentUser()
    if (!updatedUser?.emailVerified) {
      throw new Error('auth/unverified-email')
    }
    successToast('auth/login-success')
  }, `/dashboard`)

  const { onSubmit: onSocialSubmit, isLoading: isSocialLoading } = useSubmitForm(async () => {
    await authService.signInWithGoogle()
    successToast('auth/login-success')
  }, `/dashboard`)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className='grid gap-4'>
        <Button
          onClick={onSocialSubmit}
          disabled={isSocialLoading}
          type='button'
          variant='secondary'>
          {isSocialLoading ? (
            <SpinnerGapIcon className='animate-spin' />
          ) : (
            <GoogleLogoIcon />
          )}
          {!isSocialLoading && 'Continue with Google'}
        </Button>
        <div className='flex items-center justify-center gap-2 overflow-hidden'>
          <Separator />
          <span className='text-sm text-muted-foreground'>or</span>
          <Separator />
        </div>
        <InputField
          control={form.control}
          disabled={isLoading}
          type='email'
          name='email'
          placeholder='Email'
          autoComplete='username' />
        <Button asChild variant='link' className='h-auto ml-auto -mb-2 p-0 text-xs font-semibold'>
          <Link to='/forgot-password'>Forgot password?</Link>
        </Button>
        <InputField
          control={form.control}
          disabled={isLoading}
          type='password'
          name='password'
          placeholder='Password'
          autoComplete='current-password' />
        <Button disabled={isLoading} type='submit'>
          {isLoading ? (
            <SpinnerGapIcon className='animate-spin' />
          ) : (
            <SignInIcon />
          )}
          {!isLoading && 'Login to account'}
        </Button>
      </form>
    </Form>
  )
}
