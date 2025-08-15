import { createBrowserRouter } from 'react-router-dom'

import {
  AuthGuardRoute,
  GuestGuardRoute,
  RedirectRoute
} from '@/features/guards'
import { routeElements } from '@/routes/config/routeElements'
import {
  getProtectedRoutes,
  getPublicRoutes
} from '@/routes/rootRoutes'

export const router = createBrowserRouter([
  {
    element: <routeElements.RootLayout />,
    errorElement: <routeElements.ErrorFallback />,
    children: [
      {
        path: '/',
        element: <RedirectRoute />,
      },
      {
        path: 'callback',
        element: <routeElements.CallbackRoute />,
      },
      {
        element: <GuestGuardRoute />,
        children: getPublicRoutes(),
      },
      {
        element: <AuthGuardRoute />,
        children: getProtectedRoutes(),
      },
      {
        path: '*',
        element: <routeElements.NotFoundPage />,
      },
    ],
  },
])
