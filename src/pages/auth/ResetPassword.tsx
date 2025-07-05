import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { ShieldStarIcon, SpinnerGapIcon } from '@phosphor-icons/react'

import { Button, FieldControl, Form } from '@/components'
import { useSubmit } from '@/hooks'
import { resetPasswordSchema, type ResetPasswordSchema } from '@/schemas'
import { authService } from '@/services'

export const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const oobCode = searchParams.get('oobCode')

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' }
  })

  const { onSubmit, isLoading } = useSubmit(async (data: ResetPasswordSchema) => {
    await authService.confirmUserPasswordReset(oobCode!, data.password)
  }, `/login`, () => !!oobCode)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className='grid gap-4'>
        <FieldControl control={form.control} disabled={isLoading} type='password' name='password' placeholder='New password' autoComplete='new-password' autoFocus />
        <FieldControl control={form.control} disabled={isLoading} type='password' name='confirmPassword' placeholder='Confirm new password' autoComplete='new-password' />
        <Button disabled={isLoading} type='submit'>
          {isLoading ? (<SpinnerGapIcon className='animate-spin' />) : (<ShieldStarIcon />)}
          {isLoading ? 'Resetting...' : 'Reset password'}
        </Button>
      </form>
    </Form>
  )
}