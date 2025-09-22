import { createBrowserRouter } from 'react-router-dom'

import { AppGuardRoute } from '@/features/guard/app'
import { AuthGuardRoute } from '@/features/guard/auth'
import { CallbackRoute } from '@/features/guard/callback'
import { RedirectRoute } from '@/features/guard/redirect'
import { routeLazy } from '@/routes/config/lazy'
import { getProtectedRoutes, getPublicRoutes } from '@/routes/config/root'

export const router = createBrowserRouter([
  {
    element: <routeLazy.LayoutRoot />,
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
        element: <AppGuardRoute />,
        children: getPublicRoutes(),
      },
      {
        path: '*',
        element: <routeLazy.NotFoundPage />,
      },
    ],
  },
])
