import { createBrowserRouter } from 'react-router-dom'

import { routeLazy } from '@/constants'
import {
  AuthGuardRoute,
  CallbackRoute,
  GuestGuardRoute,
  RedirectRoute,
} from '@/features'
import {
  getProtectedRoutes,
  getPublicRoutes,
} from '@/routers'

// ----- Router definition -----
export const router = createBrowserRouter([
  {
    element: <routeLazy.RootLayout />,
    errorElement: <routeLazy.ErrorFallback />,
    children: [
      // Root redirect
      {
        path: '/',
        element: <RedirectRoute />,
      },
      // Firebase callback handler (email verification / password reset)
      {
        path: 'callback',
        element: <CallbackRoute />,
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
        element: <routeLazy.NotFound />,
      },
    ],
  },
])
