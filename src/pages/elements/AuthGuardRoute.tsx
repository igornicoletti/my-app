// src/routers/ProtectedRoutes.tsx
import { Navigate, Outlet } from 'react-router-dom'

import { LoadingSpinner } from '@/components'
import { useAuth } from '@/contexts'

export const AuthGuardRoute = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!user || !user.emailVerified) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}
