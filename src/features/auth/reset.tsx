import { FormInput } from '@/components/form/input'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { resetPasswordSchema, type ResetPasswordSchema } from '@/features/auth/lib/schema'
import { useSubmit } from '@/hooks/use-submit'
import { useToast } from '@/hooks/use-toast'
import { ServiceAuth } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGapIcon } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

export const AuthReset = () => {
  const { successToast } = useToast()

  const [searchParams] = useSearchParams()
  const oobCode = searchParams.get('oobCode')

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const { onSubmit, isLoading } = useSubmit(async (data: ResetPasswordSchema) => {
    await ServiceAuth.confirmUserPasswordReset(oobCode!, data.password)
    successToast('auth/password-reset-success')
  }, `/login`, () => !!oobCode)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className='grid gap-4'>
        <FormInput
          control={form.control}
          disabled={isLoading}
          type='password'
          name='password'
          placeholder='New password'
          autoComplete='new-password'
          autoFocus
        />
        <FormInput
          control={form.control}
          disabled={isLoading}
          type='password'
          name='confirmPassword'
          placeholder='Confirm new password'
          autoComplete='new-password'
        />
        <Button disabled={isLoading} type='submit'>
          {isLoading ? <SpinnerGapIcon className='animate-spin' /> : 'Set new password'}
        </Button>
      </form>
    </Form>
  )
}
