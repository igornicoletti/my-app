import { useEffect, useState, type ReactNode } from 'react'

import { CommandMenu } from '@/components'
import { CommandProviderContext } from '@/contexts'

type CommandProviderProps = {
  children: ReactNode
}

export const CommandProvider = ({ children }: CommandProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const openMenu = () => setIsOpen(true)
  const closeMenu = () => setIsOpen(false)
  const toggleMenu = () => setIsOpen((prev) => !prev)

  return (
    <CommandProviderContext.Provider value={{ isOpen, openMenu, closeMenu, toggleMenu }}>
      {children}
      <CommandMenu open={isOpen} onOpenChange={setIsOpen} />
    </CommandProviderContext.Provider>
  )
}
