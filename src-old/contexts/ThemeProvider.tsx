/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'dark' | 'light'

type ThemeProviderProps = {
  children: ReactNode
  storageKey?: string
}

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

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export const ThemeProvider = ({ children, storageKey = 'vite-ui-theme' }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(() =>
    localStorage.getItem(storageKey) as Theme | null ?? 'dark')

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme)
    setThemeState(newTheme)
  }

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeProviderContext)
  if (ctx === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}
