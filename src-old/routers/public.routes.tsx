import type { RouteObject } from 'react-router-dom'

import { routeLazy, routeMeta, } from '@/constants'

// ----- Public (unauthenticated) routes -----
export const getPublicRoutes = (): RouteObject[] => [
  {
    element: <routeLazy.AuthLayout />,
    errorElement: <routeLazy.ErrorFallback />,
    children: [
      {
        path: 'login',
        element: <routeLazy.Login />,
        handle: routeMeta.login,
      },
      {
        path: 'register',
        element: <routeLazy.Register />,
        handle: routeMeta.register,
      },
      {
        path: 'forgot-password',
        element: <routeLazy.ForgotPassword />,
        handle: routeMeta.forgotPassword,
      },
      {
        path: 'reset-password',
        element: <routeLazy.ResetPassword />,
        handle: routeMeta.resetPassword,
      },
    ],
  },
]
