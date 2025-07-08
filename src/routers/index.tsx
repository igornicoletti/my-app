import { createBrowserRouter } from 'react-router-dom'

import { ROUTE } from '@/configs'
import { AuthGuardRoute, Callback, GuestGuardRoute, HomeRouteHandler } from '@/pages'

import { getProtectedRoutes } from '@/routers/protected.routes'
import { getPublicRoutes } from '@/routers/public.routes'

export const router = createBrowserRouter([
  {
    element: <ROUTE.RootLayout />,
    errorElement: <ROUTE.ErrorFallback />,
    children: [
      {
        path: '/',
        element: <HomeRouteHandler />
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
