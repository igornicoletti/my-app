import { createBrowserRouter } from 'react-router-dom'

import { AuthGuardRoute, CallbackRoute, GuestGuardRoute, RedirectRoute } from '@/features/guards'
import { routeLazy } from '@/routes/config/lazy'
import { getProtectedRoutes, getPublicRoutes } from '@/routes/rootRoutes'

export const router = createBrowserRouter([
  {
    element: <routeLazy.RootLayout />,
    errorElement: <routeLazy.ErrorFallback />,
    children: [
      {
        path: '/',
        element: <RedirectRoute />,
      },
      {
        path: 'callback',
        element: <CallbackRoute />,
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
        element: <routeLazy.NotFoundPage />,
      },
    ],
  },
])
