import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useToast } from '@/hooks/use-toast'

type SubmitFn<T> = (data: T) => Promise<void>
type ExtraCheck = () => boolean | Promise<boolean>

export const useSubmitForm = <T>(
  submitFn: SubmitFn<T>,
  redirectPath?: string,
  extraCheck?: ExtraCheck
) => {
  const [isLoading, setIsLoading] = useState(false)
  const { errorToast } = useToast()
  const navigate = useNavigate()

  const onSubmit = useCallback(async (data: T) => {
    setIsLoading(true)
    try {
      if (extraCheck && !(await extraCheck())) return
      await submitFn(data)
      if (redirectPath) navigate(redirectPath, { replace: true })
    } catch (error) {
      errorToast(error)
    } finally {
      setIsLoading(false)
    }
  }, [submitFn, redirectPath, extraCheck, navigate, errorToast])

  return { onSubmit, isLoading }
}
