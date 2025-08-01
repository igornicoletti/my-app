import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useAuth } from '@/contexts'
import { authService } from '@/services'

export const CallbackRoute = () => {
  const { isLoading } = useAuth()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const hasHandled = useRef(false)

  const mode = searchParams.get('mode')
  const oobCode = searchParams.get('oobCode')

  useEffect(() => {
    if (hasHandled.current) return
    if (!mode || !oobCode || isLoading) return

    const handleAction = async () => {
      hasHandled.current = true
      try {
        switch (mode) {
          case 'verifyEmail': {
            await authService.applyUserActionCode(oobCode)
            await authService.getCurrentUser()?.reload()

            const updatedUser = authService.getCurrentUser()
            if (updatedUser?.emailVerified) {
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
        console.error('CallbackRoute error:', error)
        navigate('/login', { replace: true })
      }
    }

    handleAction()
  }, [mode, oobCode, isLoading, navigate])

  return null
}
