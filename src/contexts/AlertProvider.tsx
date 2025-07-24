/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

type AlertDialog = {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
}

type AlertProviderState = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  options: AlertDialog | null
  onConfirm: () => void
  onCancel: () => void
  openDialog: (options: AlertDialog) => void
}

export const AlertProviderContext = createContext<AlertProviderState | undefined>(undefined)

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<AlertDialog | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const onOpenChange = useCallback((open: boolean) => {
    setIsOpen(open)
    if (!open) setOptions(null)
  }, [])

  const openDialog = useCallback((newOptions: AlertDialog) => {
    setOptions(newOptions)
    setIsOpen(true)
  }, [])

  const onConfirm = () => {
    options?.onConfirm?.()
    setIsOpen(false)
  }

  const onCancel = () => {
    setIsOpen(false)
  }

  return (
    <AlertProviderContext.Provider value={{ isOpen, onOpenChange, options, onConfirm, onCancel, openDialog }}>
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
