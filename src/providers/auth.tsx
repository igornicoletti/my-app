import { CommonLoading } from '@/components/common/loading'
import { ServiceAuth } from '@/services/auth'
import type { User } from 'firebase/auth'
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

interface ProviderAuthProps {
  user: User | null
  isLoading: boolean
}

const ProviderAuthContext = createContext<ProviderAuthProps | undefined>(undefined)

export const ProviderAuth = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = ServiceAuth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
      setIsLoading(false)
    })

    return unsubscribe
  }, [])

  const value = useMemo(() => ({
    user,
    isLoading
  }), [user, isLoading])

  if (isLoading) return <CommonLoading message='Checking Authentication...' />

  return (
    <ProviderAuthContext.Provider value={value}>
      {children}
    </ProviderAuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(ProviderAuthContext)
  if (ctx === undefined) {
    throw new Error('useAuth must be used within an ProviderAuth')
  }
  return ctx
}
