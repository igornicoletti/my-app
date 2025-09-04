import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

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

interface DialogOptions {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
}

interface ConfirmationContextType {
  handleConfirm: (opts: DialogOptions) => Promise<boolean>
}

const ConfirmProviderContext = createContext<ConfirmationContextType | undefined>(undefined)

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<DialogOptions | null>(null)
  const [resolvePromise, setResolvePromise] = useState<(value: boolean) => void>(() => { })

  const handleConfirm = useCallback((opts: DialogOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setOptions(opts)
      setResolvePromise(() => resolve)
    })
  }, [])

  const handleClose = (confirmed: boolean) => {
    resolvePromise(confirmed)
    setOptions(null)
    setResolvePromise(() => () => { })
  }

  return (
    <ConfirmProviderContext.Provider value={{ handleConfirm }}>
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
    </ConfirmProviderContext.Provider>
  )
}

export const useConfirm = () => {
  const ctx = useContext(ConfirmProviderContext)
  if (ctx === undefined) {
    throw new Error('useConfirm must be used within a ConfirmProvider')
  }
  return ctx
}
