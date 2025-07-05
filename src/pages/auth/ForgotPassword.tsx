import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { PaperPlaneTiltIcon, SpinnerGapIcon } from '@phosphor-icons/react'

import { Button, FieldControl, Form } from '@/components'
import { useSubmit } from '@/hooks'
import { forgotPasswordSchema, type ForgotPasswordSchema } from '@/schemas'
import { authService } from '@/services'

export const ForgotPassword = () => {
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' }
  })

  const { onSubmit, isLoading } = useSubmit(async (data: ForgotPasswordSchema) => {
    await authService.sendPasswordReset(data.email)
  }, `/login`)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className='grid gap-4'>
        <FieldControl control={form.control} disabled={isLoading} type='email' name='email' placeholder='Email' autoComplete='email' autoFocus />
        <Button disabled={isLoading} type='submit'>
          {isLoading ? (<SpinnerGapIcon className='animate-spin' />) : (<PaperPlaneTiltIcon />)}
          {isLoading ? 'Sending...' : 'Send reset email'}
        </Button>
      </form>
    </Form>
  )
}