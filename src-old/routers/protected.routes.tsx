import type { RouteObject } from 'react-router-dom'

import { routeLazy, routeMeta } from '@/constants'
import { tasksLoader } from '@/features/app/tasks/data/tasks.loader'

// ----- Protected (authenticated) routes -----
export const getProtectedRoutes = (): RouteObject[] => [
  {
    element: <routeLazy.AppLayout />,
    errorElement: <routeLazy.ErrorFallback />,
    children: [
      {
        path: 'dashboard',
        element: <routeLazy.Dashboard />,
        handle: routeMeta.dashboard,
      },
      {
        path: 'tasks',
        loader: tasksLoader,
        element: <routeLazy.Tasks />,
        handle: routeMeta.tasks,
      },
      {
        path: 'users',
        element: <routeLazy.Users />,
        handle: routeMeta.users,
      },
    ],
  },
]
