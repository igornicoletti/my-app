import type { RouteObject } from 'react-router-dom'

import {
  ELEMENTS,
  HANDLES,
  type RouteHandle
} from '@/configs'
import { usersLoader } from '@/pages'

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
      {
        path: 'users',
        loader: usersLoader,
        element: <ELEMENTS.Users />,
        handle: HANDLES.users satisfies RouteHandle,
      },
    ],
  },
]
