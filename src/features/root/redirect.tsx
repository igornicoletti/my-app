import { useAuth } from '@/providers/auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const RootRedirect = () => {
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
