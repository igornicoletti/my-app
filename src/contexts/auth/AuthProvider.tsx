import type { User } from 'firebase/auth'
import { useEffect, useMemo, useState, type ReactNode } from 'react'

import { AuthProviderContext } from '@/contexts'
import { authService } from '@/services'

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser())
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

  if (isLoading) return null

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  )
}


