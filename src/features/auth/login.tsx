import { FormInput } from '@/components/form/input'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { loginSchema, type LoginSchema } from '@/features/auth/lib/schemas'
import { useSubmit } from '@/hooks/use-submit'
import { useToast } from '@/hooks/use-toast'
import { ServiceAuth } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { GoogleLogoIcon, SignInIcon, SpinnerGapIcon } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export const AuthLogin = () => {
  const { successToast } = useToast()

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  })

  const { onSubmit, isLoading } = useSubmit(async (data: LoginSchema) => {
    await ServiceAuth.signInWithEmail(data.email, data.password)
    await ServiceAuth.getCurrentUser()?.reload()
    const updatedUser = ServiceAuth.getCurrentUser()
    if (!updatedUser?.emailVerified) {
      throw new Error('auth/unverified-email')
    }
    successToast('auth/login-success')
  }, `/dashboard`)

  const { onSubmit: onSocialSubmit, isLoading: isSocialLoading } = useSubmit(async () => {
    await ServiceAuth.signInWithGoogle()
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
        <FormInput
          control={form.control}
          disabled={isLoading}
          type='email'
          name='email'
          placeholder='Email'
          autoComplete='username' />
        <Button asChild variant='link' className='h-auto ml-auto -mb-2 p-0 text-xs font-medium'>
          <Link to='/forgot-password'>Forgot password?</Link>
        </Button>
        <FormInput
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
