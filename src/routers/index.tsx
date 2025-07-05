import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import { ROUTE } from '@/configs'
import { getProtectedRoutes, getPublicRoutes } from '@/routers'

export { getProtectedRoutes } from '@/routers/protected.routes'
export { getPublicRoutes } from '@/routers/public.routes'

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