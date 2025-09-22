import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

interface ProviderConfirmProps {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
}

interface ProviderConfirmContextProps {
  handleConfirm: (opts: ProviderConfirmProps) => Promise<boolean>
}

const ProviderConfirmContext = createContext<ProviderConfirmContextProps | undefined>(undefined)

export const ProviderConfirm = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<ProviderConfirmProps | null>(null)
  const [resolvePromise, setResolvePromise] = useState<(value: boolean) => void>(() => { })

  const handleConfirm = useCallback((opts: ProviderConfirmProps): Promise<boolean> => {
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
    <ProviderConfirmContext.Provider value={{ handleConfirm }}>
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
    </ProviderConfirmContext.Provider>
  )
}

export const useConfirm = () => {
  const ctx = useContext(ProviderConfirmContext)
  if (ctx === undefined) {
    throw new Error('useConfirm must be used within a ProviderConfirm')
  }
  return ctx
}
