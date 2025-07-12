import type { RouteObject } from 'react-router-dom'

import {
  ELEMENTS,
  HANDLES,
  type RouteHandle
} from '@/configs'

// ----- Public (unauthenticated) routes -----
export const getPublicRoutes = (): RouteObject[] => [
  {
    element: <ELEMENTS.AuthLayout />,
    errorElement: <ELEMENTS.ErrorFallback />,
    children: [
      {
        path: 'login',
        element: <ELEMENTS.Login />,
        handle: HANDLES.login satisfies RouteHandle,
      },
      {
        path: 'register',
        element: <ELEMENTS.Register />,
        handle: HANDLES.register satisfies RouteHandle,
      },
      {
        path: 'forgot-password',
        element: <ELEMENTS.ForgotPassword />,
        handle: HANDLES.forgotPassword satisfies RouteHandle,
      },
      {
        path: 'reset-password',
        element: <ELEMENTS.ResetPassword />,
        handle: HANDLES.resetPassword satisfies RouteHandle,
      },
    ],
  },
]
