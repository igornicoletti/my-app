import type { RouteObject } from 'react-router-dom'

import { ROUTE } from '@/configs'

export const getProtectedRoutes = (): RouteObject[] => [{
  element: <ROUTE.AppLayout />,
  errorElement: <ROUTE.ErrorFallback />,
  children: [{
    path: 'dashboard',
    element: <ROUTE.Dashboard />,
    handle: { crumb: 'Dashboard' },
    children: [{
      path: 'users',
      element: <div>User</div>,
      handle: { crumb: 'Users' }
    }, {
      path: 'users/:id',
      element: <div>User ID</div>,
      handle: { crumb: ({ id }: { id?: string }) => id ?? 'Unknown' }
    }]
  }, {
    path: 'profile',
    element: <ROUTE.Profile />,
    handle: { crumb: 'Profile' }
  }, {
    path: 'settings',
    element: <ROUTE.Settings />,
    handle: { crumb: 'Settings' }
  }]
}]