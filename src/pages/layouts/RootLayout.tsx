import { Suspense, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { LoadingSpinner, ProgressBar } from '@/components'
import { useAuth } from '@/contexts'
import { useMeta } from '@/hooks'

export const RootLayout = () => {
  const { user, isLoading } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  useMeta()

  useEffect(() => {
    if (pathname === '/') {
      if (isLoading) return
      if (!user || !user.emailVerified) {
        navigate(`/login`, { replace: true })
      } else {
        navigate(`/dashboard`, { replace: true })
      }
    }
  }, [pathname, user, isLoading, navigate])

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProgressBar />
      <Outlet />
    </Suspense>
  )
}