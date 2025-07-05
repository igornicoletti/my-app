import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useAuth } from '@/contexts'
import { authService } from '@/services'

export const Callback = () => {
  const { user, isLoading } = useAuth()

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const mode = searchParams.get('mode')
  const oobCode = searchParams.get('oobCode')

  useEffect(() => {
    if (!mode || !oobCode) {
      navigate('/login', { replace: true })
      return
    }

    if (isLoading) return

    const handleAction = async () => {
      try {
        switch (mode) {
          case 'verifyEmail': {
            await authService.applyUserActionCode(oobCode)
            const isVerified = user?.emailVerified
            if (isVerified) {
              navigate('/dashboard', { replace: true })
            } else {
              navigate('/login', { replace: true })
            }
            break
          }
          case 'resetPassword': {
            navigate(`/reset-password?oobCode=${oobCode}`, { replace: true })
            break
          }
          default: {
            navigate('/login', { replace: true })
            break
          }
        }
      } catch (error) {
        console.error('Callback error:', error)
        navigate('/login', { replace: true })
      }
    }

    handleAction()
  }, [mode, oobCode, navigate, user, isLoading])

  return null
}
