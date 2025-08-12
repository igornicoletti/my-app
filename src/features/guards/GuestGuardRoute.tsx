import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/providers/AuthProvider'

export const GuestGuardRoute = () => {
  const { user } = useAuth()

  if (user && user.emailVerified) {
    return <Navigate to='/dashboard' replace />
  }

  return <Outlet />
}
