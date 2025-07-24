// src/routers/PublicRoutes.tsx
import { Navigate, Outlet } from 'react-router-dom'

import { LoadingSpinner } from '@/components'
import { useAuth } from '@/contexts'

export const GuestGuardRoute = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) return <LoadingSpinner />

  if (user && user.emailVerified) {
    return <Navigate to='/dashboard' replace />
  }

  return <Outlet />
}
