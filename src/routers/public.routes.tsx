import type { RouteObject } from 'react-router-dom'

import { HANDLE, LAZY, } from '@/constants'

// ----- Public (unauthenticated) routes -----
export const getPublicRoutes = (): RouteObject[] => [
  {
    element: <LAZY.AuthLayout />,
    errorElement: <LAZY.ErrorFallback />,
    children: [
      {
        path: 'login',
        element: <LAZY.Login />,
        handle: HANDLE.login,
      },
      {
        path: 'register',
        element: <LAZY.Register />,
        handle: HANDLE.register,
      },
      {
        path: 'forgot-password',
        element: <LAZY.ForgotPassword />,
        handle: HANDLE.forgotPassword,
      },
      {
        path: 'reset-password',
        element: <LAZY.ResetPassword />,
        handle: HANDLE.resetPassword,
      },
    ],
  },
]
