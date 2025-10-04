import { authHero, type AuthHero, type AuthKey } from '@/features/auth/lib/hero'
import { useLocation } from 'react-router-dom'

const authKey = (key: string): key is AuthKey => {
  return key in authHero
}

export const useHero = (): { hero: AuthHero; key: AuthKey } => {
  const { pathname } = useLocation()

  const segment = pathname.split('/').filter(Boolean).pop() ?? ''
  const key = authKey(segment) ? segment : 'login'

  return { hero: authHero[key], key }
}
