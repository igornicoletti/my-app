import { zodResolver } from '@hookform/resolvers/zod'
import { PaperPlaneTiltIcon, SpinnerGapIcon } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'

import { InputField } from '@/components/form/input-field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { forgotPasswordSchema, type ForgotPasswordSchema } from '@/features/auth/lib/schemas'
import { useSubmitForm } from '@/hooks/use-submit-form'
import { useToast } from '@/hooks/use-toast'
import { authService } from '@/services/auth-service'

export const ForgotPasswordPage = () => {
  const { successToast } = useToast()

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  const { onSubmit, isLoading } = useSubmitForm(async (data: ForgotPasswordSchema) => {
    await authService.sendPasswordReset(data.email)
    successToast('auth/password-reset-email-sent')
  }, `/login`)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className='grid gap-4'>
        <InputField
          control={form.control}
          disabled={isLoading}
          type='email'
          name='email'
          placeholder='Email'
          autoComplete='email'
          autoFocus />
        <Button disabled={isLoading} type='submit'>
          {isLoading ? (
            <SpinnerGapIcon className='animate-spin' />
          ) : (
            <PaperPlaneTiltIcon />
          )}
          {!isLoading && 'Send reset email'}
        </Button>
      </form>
    </Form>
  )
}
