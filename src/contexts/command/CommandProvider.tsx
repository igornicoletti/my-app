import { useState, type ReactNode } from 'react'

import { CommandProviderContext } from '@/contexts'

export const CommandProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)

  const openCommand = () => setOpen((open) => !open)

  return (
    <CommandProviderContext.Provider value={{ open, setOpen, openCommand }}>
      {children}
    </CommandProviderContext.Provider>
  )
}
