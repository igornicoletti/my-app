import { useState, type ReactNode } from 'react'

import { CommandProviderContext } from '@/contexts'

type CommandProviderProps = {
  children: ReactNode
}

export const CommandProvider = ({ children }: CommandProviderProps) => {
  const [open, setOpen] = useState(false)

  const openCommand = () => setOpen((open) => !open)

  return (
    <CommandProviderContext.Provider value={{ open, setOpen, openCommand }}>
      {children}
    </CommandProviderContext.Provider>
  )
}
