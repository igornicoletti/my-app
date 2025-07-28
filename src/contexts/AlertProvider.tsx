/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode
} from 'react'

type AlertDialogOptions = {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

type AlertProviderState = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  options: AlertDialogOptions | null
  openDialog: (options: AlertDialogOptions) => void
}

const AlertProviderContext = createContext<AlertProviderState | undefined>(undefined)

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<AlertDialogOptions | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const onOpenChange = useCallback((open: boolean) => {
    setIsOpen(open)
    if (!open) setOptions(null)
  }, [])

  const openDialog = useCallback((dialogOptions: AlertDialogOptions) => {
    setOptions(dialogOptions)
    setIsOpen(true)
  }, [])

  return (
    <AlertProviderContext.Provider value={{ isOpen, onOpenChange, options, openDialog }}>
      {children}
    </AlertProviderContext.Provider>
  )
}

export const useAlert = () => {
  const context = useContext(AlertProviderContext)

  if (!context)
    throw new Error('useAlert must be used within a AlertProvider')

  return context
}
