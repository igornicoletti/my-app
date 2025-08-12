import { type RouteObject } from 'react-router-dom'

import { taskLoader } from '@/features/app/tasks/api/taskLoader'
import {
  routeElements,
  routeMeta
} from '@/routes/config'

export const getPublicRoutes = (): RouteObject[] => [
  {
    element: <routeElements.AuthLayout />,
    errorElement: <routeElements.ErrorFallback />,
    children: [
      {
        path: 'login',
        element: <routeElements.LoginPage />,
        handle: routeMeta.login,
      },
      {
        path: 'register',
        element: <routeElements.RegisterPage />,
        handle: routeMeta.register,
      },
      {
        path: 'forgot-password',
        element: <routeElements.ForgotPasswordPage />,
        handle: routeMeta.forgotPassword,
      },
      {
        path: 'reset-password',
        element: <routeElements.ResetPasswordPage />,
        handle: routeMeta.resetPassword,
      },
    ],
  },
]

export const getProtectedRoutes = (): RouteObject[] => [
  {
    element: <routeElements.AppLayout />,
    errorElement: <routeElements.ErrorFallback />,
    children: [
      {
        path: 'dashboard',
        element: <routeElements.DashboardPage />,
        handle: routeMeta.dashboard,
      },
      {
        path: 'tasks',
        element: <routeElements.TasksPage />,
        loader: taskLoader,
        handle: routeMeta.tasks,
      },
      {
        path: 'users',
        element: <routeElements.UsersPage />,
        handle: routeMeta.users,
      },
    ],
  },
]
