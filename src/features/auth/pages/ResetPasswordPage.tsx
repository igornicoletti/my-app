import { zodResolver } from '@hookform/resolvers/zod'
import { ShieldStarIcon, SpinnerGapIcon } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { FieldControl } from '@/components/form'
import { Button, Form } from '@/components/ui'
import { resetPasswordSchema, type ResetPasswordSchema } from '@/features/auth'
import { useSubmitForm, useToast } from '@/hooks'
import { authService } from '@/services'

export const ResetPasswordPage = () => {
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

  const { onSubmit, isLoading } = useSubmitForm(async (data: ResetPasswordSchema) => {
    await authService.confirmUserPasswordReset(oobCode!, data.password)
    successToast('auth/password-reset-success')
  }, `/login`, () => !!oobCode)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className='grid gap-4'>
        <FieldControl
          control={form.control}
          disabled={isLoading}
          type='password'
          name='password'
          placeholder='New password'
          autoComplete='new-password'
          autoFocus />
        <FieldControl
          control={form.control}
          disabled={isLoading}
          type='password'
          name='confirmPassword'
          placeholder='Confirm new password'
          autoComplete='new-password' />
        <Button disabled={isLoading} type='submit'>
          {isLoading ? (
            <SpinnerGapIcon className='animate-spin' />
          ) : (
            <ShieldStarIcon />
          )}
          {isLoading && 'Reset password'}
        </Button>
      </form>
    </Form>
  )
}
