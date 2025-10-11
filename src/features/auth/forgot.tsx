import { FormInput } from '@/components/form/input'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { forgotPasswordSchema, type ForgotPasswordSchema } from '@/features/auth/lib/schema'
import { useSubmit } from '@/hooks/use-submit'
import { useToast } from '@/hooks/use-toast'
import { ServiceAuth } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGapIcon } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'

export const AuthForgot = () => {
  const { successToast } = useToast()

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  const { onSubmit, isLoading } = useSubmit(async (data: ForgotPasswordSchema) => {
    await ServiceAuth.sendPasswordReset(data.email)
    successToast('auth/password-reset-email-sent')
  }, `/login`)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className='grid gap-4'>
        <FormInput
          control={form.control}
          disabled={isLoading}
          type='email'
          name='email'
          placeholder='Email'
          autoComplete='email'
          autoFocus
        />
        <Button disabled={isLoading} type='submit'>
          {isLoading ? <SpinnerGapIcon className='animate-spin' /> : 'Send reset link'}
        </Button>
      </form>
    </Form>
  )
}
