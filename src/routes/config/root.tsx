import { ConstantMetadata } from '@/constants/metadata'
import { routeLazy } from '@/routes/config/lazy'
import { type RouteObject } from 'react-router-dom'

export const getPublicRoutes = (): RouteObject[] => [
  {
    element: <routeLazy.LayoutAuth />,
    errorElement: <routeLazy.ErrorFallback />,
    children: [
      {
        path: 'login',
        element: <routeLazy.PageLogin />,
        handle: ConstantMetadata.login,
      },
      {
        path: 'register',
        element: <routeLazy.PageRegister />,
        handle: ConstantMetadata.register,
      },
      {
        path: 'forgot-password',
        element: <routeLazy.PageForgot />,
        handle: ConstantMetadata.forgotPassword,
      },
      {
        path: 'reset-password',
        element: <routeLazy.PageReset />,
        handle: ConstantMetadata.resetPassword,
      },
    ],
  },
]

export const getProtectedRoutes = (): RouteObject[] => [
  {
    element: <routeLazy.LayoutApp />,
    errorElement: <routeLazy.ErrorFallback />,
    children: [
      {
        path: 'dashboard',
        element: <routeLazy.DashboardPage />,
        handle: ConstantMetadata.dashboard,
      },
      {
        path: 'tasks',
        element: <routeLazy.TasksPage />,
        handle: ConstantMetadata.tasks,
      },
      {
        path: 'users',
        element: <routeLazy.UsersPage />,
        handle: ConstantMetadata.users,
      },
    ],
  },
]
