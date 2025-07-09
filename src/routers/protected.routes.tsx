import type { RouteObject } from 'react-router-dom'

import { ROUTE } from '@/configs'

export const getProtectedRoutes = (): RouteObject[] => [
  {
    element: <ROUTE.AppLayout />,
    errorElement: <ROUTE.ErrorFallback />,
    children: [
      {
        path: 'dashboard',
        element: <ROUTE.Dashboard />,
        handle: {
          crumb: 'Dashboard',
          title: 'Dashboard',
          description: 'Overview of your activity, performance, and quick access to key features.'
        }
      },
      {
        path: 'analytics',
        element: <ROUTE.Analytics />,
        handle: {
          crumb: 'Analytics',
          title: 'Analytics',
          description: 'Detailed insights and data visualizations to help you make informed decisions.'
        }
      }
    ]
  }
]
