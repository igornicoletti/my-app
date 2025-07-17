import { createContext } from 'react'

export type Theme = 'dark' | 'light'

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const initialState: ThemeProviderState = {
  theme: 'dark',
  setTheme: () => null,
  toggleTheme: () => null
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)
