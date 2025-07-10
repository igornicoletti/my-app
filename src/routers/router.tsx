import { createBrowserRouter } from 'react-router-dom'

import { ROUTE_ELEMENTS } from '@/configs'
import {
  AuthGuardRoute,
  Callback,
  GuestGuardRoute,
  RedirectRoute,
} from '@/pages'
import {
  getProtectedRoutes,
  getPublicRoutes,
} from '@/routers'

// ----- Router definition -----
export const router = createBrowserRouter([
  {
    element: <ROUTE_ELEMENTS.RootLayout />,
    errorElement: <ROUTE_ELEMENTS.ErrorFallback />,
    children: [
      // Root redirect
      {
        path: '/',
        element: <RedirectRoute />,
      },
      // Firebase callback handler (email verification / password reset)
      {
        path: 'callback',
        element: <Callback />,
      },
      // Public-only pages (e.g. login, register)
      {
        element: <GuestGuardRoute />,
        children: getPublicRoutes(),
      },
      // Auth-protected pages (e.g. dashboard, settings)
      {
        element: <AuthGuardRoute />,
        children: getProtectedRoutes(),
      },
      // Fallback for unknown routes
      {
        path: '*',
        element: <ROUTE_ELEMENTS.NotFound />,
      },
    ],
  },
])
