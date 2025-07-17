import { createContext } from 'react'

export type AlertDialog = {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
}

export type AlertProviderState = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  options: AlertDialog | null
  onConfirm: () => void
  onCancel: () => void
  openDialog: (options: AlertDialog) => void
}

export const AlertProviderContext = createContext<AlertProviderState | undefined>(undefined)
