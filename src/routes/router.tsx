import { createBrowserRouter } from 'react-router-dom'

import { routeLazy } from '@/routes/config/routeLazy'
import { getProtectedRoutes, getPublicRoutes } from '@/routes/rootRoutes'

export const router = createBrowserRouter([
  {
    element: <routeLazy.RootLayout />,
    errorElement: <routeLazy.ErrorFallback />,
    children: [
      {
        path: '/',
        element: <routeLazy.RedirectRoute />,
      },
      {
        path: 'callback',
        element: <routeLazy.CallbackRoute />,
      },
      {
        element: <routeLazy.GuestGuardRoute />,
        children: getPublicRoutes(),
      },
      {
        element: <routeLazy.AuthGuardRoute />,
        children: getProtectedRoutes(),
      },
      {
        path: '*',
        element: <routeLazy.NotFoundPage />,
      },
    ],
  },
])
