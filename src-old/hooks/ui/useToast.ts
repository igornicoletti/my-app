import { toast } from 'sonner'

import {
  errorCode,
  type ErrorKey,
  type SuccessKey
} from '@/constants/messages'

type FirebaseErrorLike = { code: string }

const isFirebaseError = (error: unknown): error is FirebaseErrorLike =>
  typeof error === 'object' &&
  error !== null &&
  'code' in error &&
  typeof (error as FirebaseErrorLike).code === 'string'

const getErrorCode = (error: unknown): string => {
  if (isFirebaseError(error)) {
    return error.code
  }
  if (error instanceof Error && error.message) {
    return error.message
  }
  return 'default'
}

const isErrorKey = (key: string): key is ErrorKey => key in errorCode
const isSuccessKey = (key: string): key is SuccessKey => key in messageSuccess

export const useToast = () => {
  const errorToast = (error: unknown) => {
    const code = getErrorCode(error)
    const { title, description } = isErrorKey(code) ? errorCode[code] : errorCode.default

    toast.message(title, {
      description,
      classNames: {
        title: '!text-destructive',
        description: '!text-foreground',
      },
    })
  }

  const successToast = (key: string) => {
    const { title, description } = isSuccessKey(key) ? messageSuccess[key] : messageSuccess.default

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
