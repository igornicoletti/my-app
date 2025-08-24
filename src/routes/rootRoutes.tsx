import { type RouteObject } from 'react-router-dom'

import { taskAction } from '@/features/app/tasks/lib/action'
import { taskLoader } from '@/features/app/tasks/lib/loader'
import { routeLazy, routeMeta } from '@/routes/config'

export const getPublicRoutes = (): RouteObject[] => [
  {
    element: <routeLazy.AuthLayout />,
    errorElement: <routeLazy.ErrorFallback />,
    children: [
      {
        path: 'login',
        element: <routeLazy.LoginPage />,
        handle: routeMeta.login,
      },
      {
        path: 'register',
        element: <routeLazy.RegisterPage />,
        handle: routeMeta.register,
      },
      {
        path: 'forgot-password',
        element: <routeLazy.ForgotPasswordPage />,
        handle: routeMeta.forgotPassword,
      },
      {
        path: 'reset-password',
        element: <routeLazy.ResetPasswordPage />,
        handle: routeMeta.resetPassword,
      },
    ],
  },
]

export const getProtectedRoutes = (): RouteObject[] => [
  {
    element: <routeLazy.AppLayout />,
    errorElement: <routeLazy.ErrorFallback />,
    children: [
      {
        path: 'dashboard',
        element: <routeLazy.DashboardPage />,
        handle: routeMeta.dashboard,
      },
      {
        path: 'tasks',
        loader: taskLoader,
        action: taskAction,
        element: <routeLazy.TasksPage />,
        handle: routeMeta.tasks,
      },
      {
        path: 'users',
        element: <routeLazy.UsersPage />,
        handle: routeMeta.users,
      },
    ],
  },
]
