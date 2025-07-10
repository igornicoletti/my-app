import type { RouteObject } from 'react-router-dom'

import {
  ROUTE_ELEMENTS,
  ROUTE_HANDLES,
  type RouteHandle
} from '@/configs'

// ----- Protected (authenticated) routes -----
export const getProtectedRoutes = (): RouteObject[] => [
  {
    element: <ROUTE_ELEMENTS.AppLayout />,
    errorElement: <ROUTE_ELEMENTS.ErrorFallback />,
    children: [
      {
        path: 'dashboard',
        element: <ROUTE_ELEMENTS.Dashboard />,
        handle: ROUTE_HANDLES.dashboard satisfies RouteHandle,
      },
      {
        path: 'analytics',
        element: <ROUTE_ELEMENTS.Analytics />,
        handle: ROUTE_HANDLES.analytics satisfies RouteHandle,
      },
    ],
  },
]
