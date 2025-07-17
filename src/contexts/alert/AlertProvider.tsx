import { useCallback, useState, type ReactNode } from 'react'

import {
  AlertProviderContext,
  type AlertDialog
} from '@/contexts'

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
