import {
  ERROR,
  SUCCESS,
  type ErrorKey,
  type SuccessKey,
} from '@/constants'
import { toast } from 'sonner'

type FirebaseErrorLike = { code: string }

const isFirebaseError = (error: unknown): error is FirebaseErrorLike =>
  typeof error === 'object' &&
  error !== null &&
  'code' in error &&
  typeof (error as FirebaseErrorLike).code === 'string'

const getErrorCode = (error: unknown): string => {
  if (isFirebaseError(error)) return error.code
  if (error instanceof Error && error.message) return error.message
  return 'default'
}

const isErrorKey = (key: string): key is ErrorKey => key in ERROR
const isSuccessKey = (key: string): key is SuccessKey => key in SUCCESS

export const useToast = () => {
  const errorToast = (error: unknown) => {
    const code = getErrorCode(error)
    const { title, description } = isErrorKey(code) ? ERROR[code] : ERROR.default

    toast.message(title, {
      description,
      classNames: {
        title: '!text-destructive',
        description: '!text-foreground',
      },
    })
  }

  const successToast = (key: string) => {
    const { title, description } = isSuccessKey(key) ? SUCCESS[key] : SUCCESS.default

    toast.message(title, {
      description,
      classNames: {
        title: '!text-success',
        description: '!text-foreground',
      },
    })
  }

  return { errorToast, successToast }
}
