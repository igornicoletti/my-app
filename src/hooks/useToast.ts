import { toast } from 'sonner'

import {
  errorCode,
  successCode,
  type ErrorKey,
  type SuccessKey,
} from '@/constants/messages'

interface CustomMessage {
  title: string
  description?: string
}

interface FirebaseErrorLike {
  code: string
}

const isFirebaseError = (error: unknown): error is FirebaseErrorLike =>
  typeof error === 'object' &&
  error !== null &&
  'code' in error &&
  typeof (error as FirebaseErrorLike).code === 'string'

const getErrorCode = (error: unknown): string => {
  if (typeof error === 'string') return error
  if (isFirebaseError(error)) return error.code
  if (error instanceof Error && error.message) return error.message
  return 'default'
}

const isErrorKey = (key: string): key is ErrorKey => key in errorCode
const isSuccessKey = (key: string): key is SuccessKey => key in successCode

const isCustomMessage = (payload: unknown): payload is CustomMessage =>
  typeof payload === 'object' &&
  payload !== null &&
  'title' in payload &&
  typeof (payload as CustomMessage).title === 'string'


export const useToast = () => {
  const errorToast = (payload: unknown) => {
    let title: string
    let description: string | undefined

    if (isCustomMessage(payload)) {
      title = payload.title
      description = payload.description
    } else {
      const code = getErrorCode(payload)

      if (isErrorKey(code)) {
        ({ title, description } = errorCode[code])
      } else {
        if (code === 'default') {
          ({ title, description } = errorCode.default)
        } else {
          title = code
          description = undefined
        }
      }
    }

    toast.message(title, {
      description,
      classNames: {
        title: '!text-destructive',
        description: '!text-foreground',
      },
    })
  }

  const successToast = (payload: SuccessKey | string | CustomMessage) => {
    let title: string
    let description: string | undefined

    if (isCustomMessage(payload)) {
      title = payload.title
      description = payload.description
    } else if (isSuccessKey(payload)) {
      ({ title, description } = successCode[payload])
    } else {
      title = payload
      description = undefined
    }

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
