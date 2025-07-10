import type { RouteObject } from 'react-router-dom'

import {
  ROUTE_ELEMENTS,
  ROUTE_HANDLES,
  type RouteHandle
} from '@/configs'

// ----- Public (unauthenticated) routes -----
export const getPublicRoutes = (): RouteObject[] => [
  {
    element: <ROUTE_ELEMENTS.AuthLayout />,
    errorElement: <ROUTE_ELEMENTS.ErrorFallback />,
    children: [
      {
        path: 'login',
        element: <ROUTE_ELEMENTS.Login />,
        handle: ROUTE_HANDLES.login satisfies RouteHandle,
      },
      {
        path: 'register',
        element: <ROUTE_ELEMENTS.Register />,
        handle: ROUTE_HANDLES.register satisfies RouteHandle,
      },
      {
        path: 'forgot-password',
        element: <ROUTE_ELEMENTS.ForgotPassword />,
        handle: ROUTE_HANDLES.forgotPassword satisfies RouteHandle,
      },
      {
        path: 'reset-password',
        element: <ROUTE_ELEMENTS.ResetPassword />,
        handle: ROUTE_HANDLES.resetPassword satisfies RouteHandle,
      },
    ],
  },
]
