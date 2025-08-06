/* eslint-disable react-refresh/only-export-components */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'


interface DialogOptions {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
}

interface ConfirmationContextType {
  confirm: (options: DialogOptions) => Promise<boolean>
}

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(undefined)

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<DialogOptions | null>(null)
  const [resolvePromise, setResolvePromise] = useState<(value: boolean) => void>(() => { })

  const confirm = useCallback((options: DialogOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setOptions(options)
      setResolvePromise(() => resolve)
    })
  }, [])

  const handleClose = (confirmed: boolean) => {
    resolvePromise(confirmed)
    setOptions(null)
    setResolvePromise(() => () => { })
  }

  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      {children}
      <AlertDialog open={options !== null}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{options?.title || 'Are you absolutely sure?'}</AlertDialogTitle>
            <AlertDialogDescription>
              {options?.description || 'This action cannot be undone. This will permanently remove the data from our servers.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleClose(false)}>
              {options?.cancelText || 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleClose(true)}>
              {options?.confirmText || 'Continue'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmationContext.Provider>
  )
}

export const useConfirm = () => {
  const context = useContext(ConfirmationContext)
  if (context === undefined) {
    throw new Error('useConfirm must be used within a ConfirmProvider')
  }
  return context
}
