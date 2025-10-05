import { messages, type MessageKey } from '@/constants/messages'
import { toast } from 'sonner'

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
  return 'defaultError'
}

const isCustomMessage = (payload: unknown): payload is CustomMessage =>
  typeof payload === 'object' &&
  payload !== null &&
  'title' in payload &&
  typeof (payload as CustomMessage).title === 'string'

export const useToast = () => {
  const showToast = (
    payload: unknown,
    type: 'error' | 'success' = 'success'
  ) => {
    let title = ''
    let description: string | undefined

    if (isCustomMessage(payload)) {
      ; ({ title, description } = payload)
    } else {
      const code = typeof payload === 'string' ? payload : getErrorCode(payload)
      const fallback: MessageKey = type === 'error' ? 'defaultError' : 'defaultSuccess'
      const key: MessageKey = code in messages ? (code as MessageKey) : fallback;
      ({ title, description } = messages[key])
    }

    toast.message(title, {
      description,
      classNames: {
        title: type === 'error' ? '!text-destructive' : '!text-primary',
        description: '!text-popover-foreground',
      },
    })
  }

  const errorToast = (payload: unknown) => showToast(payload, 'error')
  const successToast = (payload: unknown) => showToast(payload, 'success')

  return { errorToast, successToast }
}
