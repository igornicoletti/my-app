import { useEffect, useState, type ReactNode } from 'react'

import { ThemeProviderContext } from '@/contexts'

type ThemeProviderProps = {
  children: ReactNode
  storageKey?: string
}

export const ThemeProvider = ({ children, storageKey = 'vite-ui-theme' }: ThemeProviderProps) => {
  const [isDark, setIsDark] = useState<boolean>(() => localStorage.getItem(storageKey) === 'dark')

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.toggle('dark', isDark)
  }, [isDark])

  const value = {
    isDark,
    toggleTheme: () => {
      setIsDark((currentIsDark) => {
        const newIsDark = !currentIsDark
        if (newIsDark) {
          localStorage.setItem(storageKey, 'dark')
        } else {
          localStorage.removeItem(storageKey)
        }
        return newIsDark
      })
    }
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
