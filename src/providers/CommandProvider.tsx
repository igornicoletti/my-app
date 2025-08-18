/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react'

interface CommandProviderState {
  open: boolean
  setOpen: (value: boolean) => void
  openCommand: () => void
}

const CommandProviderContext = createContext<CommandProviderState | null>(null)

export const CommandProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)

  const openCommand = () => setOpen((open) => !open)

  return (
    <CommandProviderContext.Provider value={{ open, setOpen, openCommand }}>
      {children}
    </CommandProviderContext.Provider>
  )
}

export const useCommand = () => {
  const ctx = useContext(CommandProviderContext)
  if (ctx === null) {
    throw new Error('useCommand must be used within a CommandProvider')
  }
  return ctx
}
