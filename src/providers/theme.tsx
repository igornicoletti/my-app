import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ProviderThemeProps {
  children: ReactNode
  storageKey?: string
}

interface ProviderThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const initialState: ProviderThemeContextProps = {
  theme: 'dark',
  setTheme: () => null,
  toggleTheme: () => null
}

const ProviderThemeContext = createContext<ProviderThemeContextProps>(initialState)

export const ProviderTheme = ({ children, storageKey = 'vite-ui-theme' }: ProviderThemeProps) => {
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
    <ProviderThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ProviderThemeContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ProviderThemeContext)
  if (ctx === undefined) {
    throw new Error('useTheme must be used within a ProviderTheme')
  }
  return ctx
}
