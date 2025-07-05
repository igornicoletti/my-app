import type { User } from 'firebase/auth'
import { createContext } from 'react'

type AuthProviderState = {
  user: User | null
  isLoading: boolean
}

export const AuthProviderContext = createContext<AuthProviderState | undefined>(undefined)
