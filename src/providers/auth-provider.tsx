import type { User } from 'firebase/auth'
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import { LoadingSpinner } from '@/components/common/loading-spinner'
import { authService } from '@/services/auth-service'

interface AuthProviderState {
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

  if (isLoading) return <LoadingSpinner message='Checking Authentication...' />

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthProviderContext)
  if (ctx === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
