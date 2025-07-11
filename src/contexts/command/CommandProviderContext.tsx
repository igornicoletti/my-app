import { createContext } from 'react'

export type CommandProviderState = {
  open: boolean
  setOpen: (value: boolean) => void
}

export const CommandProviderContext = createContext<CommandProviderState | null>(null)
