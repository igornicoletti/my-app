import { createContext, useContext, useState, type ReactNode } from 'react'

interface ProviderCommandProps {
  open: boolean
  setOpen: (value: boolean) => void
  openCommand: () => void
}

const ProviderCommandContext = createContext<ProviderCommandProps | null>(null)

export const ProviderCommand = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)

  const openCommand = () => setOpen((open) => !open)

  return (
    <ProviderCommandContext.Provider value={{ open, setOpen, openCommand }}>
      {children}
    </ProviderCommandContext.Provider>
  )
}

export const useCommand = () => {
  const ctx = useContext(ProviderCommandContext)
  if (ctx === null) {
    throw new Error('useCommand must be used within a ProviderCommand')
  }
  return ctx
}
