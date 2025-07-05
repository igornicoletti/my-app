import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import { ROUTE } from '@/configs'
import { getProtectedRoutes } from '@/routers/protected.routes'
import { getPublicRoutes } from '@/routers/public.routes'

const allRoutes: RouteObject[] = [
  ...getPublicRoutes(),
  ...getProtectedRoutes()
]

export const router = createBrowserRouter([{
  element: <ROUTE.RootLayout />,
  errorElement: <ROUTE.ErrorFallback />,
  children: [...allRoutes, {
    path: '*',
    element: <ROUTE.NotFound />
  }]
}])