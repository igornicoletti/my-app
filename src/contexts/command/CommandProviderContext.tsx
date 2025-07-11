import { createContext } from 'react'

export type CommandProviderState = {
  isOpen: boolean
  openMenu: () => void
  closeMenu: () => void
  toggleMenu: () => void
}

const initialState: CommandProviderState = {
  isOpen: false,
  openMenu: () => null,
  closeMenu: () => null,
  toggleMenu: () => null
}

export const CommandProviderContext = createContext<CommandProviderState>(initialState)
