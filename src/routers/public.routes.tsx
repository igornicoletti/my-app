import type { RouteObject } from 'react-router-dom'

import { ROUTE } from '@/configs'

export const getPublicRoutes = (): RouteObject[] => [{
  element: <ROUTE.AuthLayout />,
  errorElement: <ROUTE.ErrorFallback />,
  children: [{
    path: 'callback',
    element: <ROUTE.Callback />,
    handle: { crumb: 'Callback' }
  }, {
    path: 'login',
    element: <ROUTE.Login />,
    handle: { crumb: 'Login' }
  }, {
    path: 'register',
    element: <ROUTE.Register />,
    handle: { crumb: 'Register' }
  }, {
    path: 'forgot-password',
    element: <ROUTE.ForgotPassword />,
    handle: { crumb: 'Forgot Password' }
  }, {
    path: 'reset-password',
    element: <ROUTE.ResetPassword />,
    handle: { crumb: 'Reset Password' }
  }]
}]
