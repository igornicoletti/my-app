import { createBrowserRouter } from 'react-router-dom'

import { ROUTE } from '@/configs'
import {
  AuthGuardRoute,
  Callback,
  GuestGuardRoute,
  RedirectRoute
} from '@/pages'
import {
  getProtectedRoutes,
  getPublicRoutes
} from '@/routers'

export const router = createBrowserRouter([
  {
    element: <ROUTE.RootLayout />,
    errorElement: <ROUTE.ErrorFallback />,
    children: [
      {
        path: '/',
        element: <RedirectRoute />
      },
      {
        path: 'callback',
        element: <Callback />
      },
      {
        element: <GuestGuardRoute />,
        children: getPublicRoutes()
      },
      {
        element: <AuthGuardRoute />,
        children: getProtectedRoutes()
      },
      {
        path: '*',
        element: <ROUTE.NotFound />
      }
    ]
  }
])
