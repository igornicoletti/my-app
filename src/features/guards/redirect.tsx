import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/providers/auth-provider'

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

  return null
}
