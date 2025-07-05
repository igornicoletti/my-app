import type { RouteObject } from 'react-router-dom'

import { ROUTE } from '@/configs'

export const getProtectedRoutes = (): RouteObject[] => [{
  element: <ROUTE.AppLayout />,
  errorElement: <ROUTE.ErrorFallback />,
  children: [{
    path: 'dashboard',
    element: <ROUTE.Dashboard />,
    handle: { crumb: 'Dashboard' }
  }, {
    path: 'analytics',
    element: <ROUTE.Analytics />,
    handle: { crumb: 'Analytics' }
  }]
}]