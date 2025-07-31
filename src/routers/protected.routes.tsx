import type { RouteObject } from 'react-router-dom'

import { HANDLE, LAZY } from '@/constants'
import { tasksLoader } from '@/features'

// ----- Protected (authenticated) routes -----
export const getProtectedRoutes = (): RouteObject[] => [
  {
    element: <LAZY.AppLayout />,
    errorElement: <LAZY.ErrorFallback />,
    children: [
      {
        path: 'dashboard',
        element: <LAZY.Dashboard />,
        handle: HANDLE.dashboard,
      },
      {
        path: 'tasks',
        loader: tasksLoader,
        element: <LAZY.Tasks />,
        handle: HANDLE.tasks,
      },
      {
        path: 'users',
        element: <LAZY.Users />,
        handle: HANDLE.users,
      },
    ],
  },
]
