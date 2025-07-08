import { toast } from 'sonner'

import { ERROR, SUCCESS } from '@/configs'

type MessageKey = keyof typeof ERROR | keyof typeof SUCCESS

const isFirebaseError = (error: unknown): error is { code: string } =>
  typeof error === 'object' && error !== null && 'code' in error &&
  typeof (error as { code: string }).code === 'string'

export const useToast = () => {
  const errorToast = (error: unknown) => {
    const errorCode = isFirebaseError(error) ? error.code : 'default'
    const { title, description } = ERROR[errorCode as MessageKey] ?? ERROR.default
    toast.message(title, {
      description,
      classNames: {
        title: '!text-destructive',
        description: '!text-foreground'
      }
    })
  }

  const successToast = (key: MessageKey) => {
    const { title, description } = SUCCESS[key] ?? SUCCESS.default
    toast.message(title, {
      description,
      classNames: {
        title: '!text-primary',
        description: '!text-foreground'
      }
    })
  }

  return { errorToast, successToast }
}
