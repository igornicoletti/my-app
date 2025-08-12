import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/providers/AuthProvider'

export const AuthGuardRoute = () => {
  const { user } = useAuth()

  if (!user || !user.emailVerified) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}
