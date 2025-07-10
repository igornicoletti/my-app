import { toast } from 'sonner'

import {
  ERROR,
  SUCCESS,
  type ErrorMessageKey,
  type SuccessMessageKey,
} from '@/configs'

type FirebaseErrorLike = { code: string }

const isFirebaseError = (error: unknown): error is FirebaseErrorLike =>
  typeof error === 'object' &&
  error !== null &&
  'code' in error &&
  typeof (error as FirebaseErrorLike).code === 'string'

export const useToast = () => {
  const errorToast = (error: unknown) => {
    const code = isFirebaseError(error) ? error.code : 'default'
    const { title, description } = ERROR[code as ErrorMessageKey] ?? ERROR.default

    toast.message(title, {
      description,
      classNames: {
        title: '!text-destructive',
        description: '!text-foreground',
      },
    })
  }

  const successToast = (key: SuccessMessageKey | string) => {
    const { title, description } = SUCCESS[key as SuccessMessageKey] ?? SUCCESS.default

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
