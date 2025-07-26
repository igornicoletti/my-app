import {
  authData,
  type AuthKey,
  type AuthProps
} from '@/features/auth'
import { useLocation } from 'react-router-dom'

const isAuthKey = (key: string): key is AuthKey => {
  return key in authData
}

export const useAuth = (): AuthProps => {
  const { pathname } = useLocation()
  const segment = pathname.split('/').filter(Boolean).pop() ?? ''

  return isAuthKey(segment) ? authData[segment] : authData.login
}
