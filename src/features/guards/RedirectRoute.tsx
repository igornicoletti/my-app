import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { LoadingSpinner } from '@/components'
import { useAuth } from '@/contexts'

export const RedirectRoute = () => {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading) {
      if (user && user.emailVerified) {
        navigate('/dashboard', { replace: true })
      } else {
        navigate('/login', { replace: true })
      }
    }
  }, [user, isLoading, navigate])

  if (isLoading) return <LoadingSpinner />

  return null
}
