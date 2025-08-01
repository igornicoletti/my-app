/* eslint-disable react-refresh/only-export-components */
import type { User } from 'firebase/auth'
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react'

import { LoadingSpinner } from '@/components'
import { authService } from '@/services'

type AuthProviderState = {
  user: User | null
  isLoading: boolean
}

const AuthProviderContext = createContext<AuthProviderState | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
      setIsLoading(false)
    })

    return unsubscribe
  }, [])

  const value = useMemo(() => ({
    user, isLoading
  }), [user, isLoading])

  if (isLoading) return <LoadingSpinner message='Checking authentication...' />

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthProviderContext)

  if (context === undefined)
    throw new Error('useAuth must be used within an AuthProvider')

  return context
}
