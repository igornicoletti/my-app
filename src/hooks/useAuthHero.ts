import { useLocation } from 'react-router-dom'

import type { AuthHero, AuthKey } from '@/features/auth'
import { authConfig } from '@/features/auth'

const authKey = (key: string): key is AuthKey => {
  return key in authConfig
}

export const useAuthHero = (): { hero: AuthHero; key: AuthKey } => {
  const { pathname } = useLocation()

  const segment = pathname.split('/').filter(Boolean).pop() ?? ''
  const key = authKey(segment) ? segment : 'login'

  return { hero: authConfig[key], key }
}
