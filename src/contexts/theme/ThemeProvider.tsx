import { useEffect, useState, type ReactNode } from 'react'

import { ThemeProviderContext, type Theme } from '@/contexts'

type ThemeProviderProps = {
  children: ReactNode
  storageKey?: string
}

export const ThemeProvider = ({ children, storageKey = 'vite-ui-theme' }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() =>
    (localStorage.getItem(storageKey) as Theme | null) ?? 'dark')

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    }
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
