import { createBrowserRouter } from 'react-router-dom'

import { AuthGuardRoute } from '@/features/guards/auth-guard'
import { CallbackRoute } from '@/features/guards/callback'
import { GuestGuardRoute } from '@/features/guards/guest-guard'
import { RedirectRoute } from '@/features/guards/redirect'
import { routeLazy } from '@/routes/config/lazy-routes'
import { getProtectedRoutes, getPublicRoutes } from '@/routes/config/root-routes'

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
        element: <AuthGuardRoute />,
        children: getProtectedRoutes(),
      },
      {
        element: <GuestGuardRoute />,
        children: getPublicRoutes(),
      },
      {
        path: '*',
        element: <routeLazy.NotFoundPage />,
      },
    ],
  },
])
