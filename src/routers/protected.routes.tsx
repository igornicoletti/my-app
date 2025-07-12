import type { RouteObject } from 'react-router-dom'

import {
  ELEMENTS,
  HANDLES,
  type RouteHandle
} from '@/configs'

// ----- Protected (authenticated) routes -----
export const getProtectedRoutes = (): RouteObject[] => [
  {
    element: <ELEMENTS.AppLayout />,
    errorElement: <ELEMENTS.ErrorFallback />,
    children: [
      {
        path: 'dashboard',
        element: <ELEMENTS.Dashboard />,
        handle: HANDLES.dashboard satisfies RouteHandle,
      },
      {
        path: 'analytics',
        element: <ELEMENTS.Analytics />,
        handle: HANDLES.analytics satisfies RouteHandle,
      },
    ],
  },
]
