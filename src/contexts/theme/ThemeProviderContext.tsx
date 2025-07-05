import { createContext } from 'react'

type ThemeProviderState = {
  isDark: boolean
  toggleTheme: () => void
}

export const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)
