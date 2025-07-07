import type { FirebaseError } from 'firebase/app'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { ERROR } from '@/configs'

type SubmitFn<T> = (data: T) => Promise<void>

const isFirebaseError = (error: unknown): error is FirebaseError =>
  typeof error === 'object' && error !== null && 'code' in error &&
  typeof (error as FirebaseError).code === 'string'

export const useSubmit = <T>(
  submitFn: SubmitFn<T>,
  redirectPath: string,
  extraCheck?: () => boolean | Promise<boolean>
) => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = useCallback(
    async (data: T) => {
      setIsLoading(true)

      try {
        if (extraCheck && !(await extraCheck())) return

        await submitFn(data)
        navigate(redirectPath, { replace: true })

      } catch (error) {
        const { title, description } = isFirebaseError(error)
          ? ERROR[error.code] ?? ERROR.default
          : ERROR.default

        toast.message(title, {
          description,
          classNames: {
            title: '!text-destructive',
            description: '!text-foreground'
          }
        })
      } finally {
        setIsLoading(false)
      }
    },
    [submitFn, redirectPath, extraCheck, navigate]
  )

  return { onSubmit, isLoading }
}
