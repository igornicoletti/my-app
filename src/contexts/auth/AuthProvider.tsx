import type { User } from 'firebase/auth'
import { useEffect, useMemo, useState, type ReactNode } from 'react'

import { LoadingSpinner } from '@/components'
import { AuthProviderContext } from '@/contexts'
import { authService } from '@/services'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
      setIsLoading(false)
    })

    return unsubscribe
  }, [])

  const value = useMemo(() => ({ user, isLoading }), [user, isLoading])

  if (isLoading) return <LoadingSpinner />

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  )
}
