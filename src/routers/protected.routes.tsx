import type { RouteObject } from 'react-router-dom'

import {
  ELEMENTS,
  HANDLES,
  type RouteHandle
} from '@/configs'
import { userLoader } from '@/features'

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
        path: 'user',
        loader: userLoader,
        element: <ELEMENTS.User />,
        handle: HANDLES.user satisfies RouteHandle,
      },
    ],
  },
]
