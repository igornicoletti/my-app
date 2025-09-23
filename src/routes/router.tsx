import { routeLazy } from '@/routes/lazy'
import { routeMetadata } from '@/routes/metadata'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    element: <routeLazy.LayoutRoot />,
    errorElement: <routeLazy.RootFallback />,
    children: [
      {
        path: '/',
        element: <routeLazy.RootRedirect />,
      },
      {
        path: 'callback',
        element: <routeLazy.RootCallback />,
      },
      {
        element: <routeLazy.LayoutAuth />,
        children: [
          {
            path: 'login',
            element: <routeLazy.AuthLogin />,
            handle: routeMetadata.login,
          },
          {
            path: 'register',
            element: <routeLazy.AuthRegister />,
            handle: routeMetadata.register,
          },
          {
            path: 'forgot-password',
            element: <routeLazy.AuthForgot />,
            handle: routeMetadata.forgotPassword,
          },
          {
            path: 'reset-password',
            element: <routeLazy.AuthReset />,
            handle: routeMetadata.resetPassword,
          },
        ],
      },
      {
        element: <routeLazy.LayoutApp />,
        children: [
          {
            path: 'dashboard',
            element: <routeLazy.AppDashboard />,
            handle: routeMetadata.dashboard,
          },
          {
            path: 'tasks',
            element: <routeLazy.AppTask />,
            handle: routeMetadata.tasks,
          },
          {
            path: 'users',
            element: <routeLazy.AppUser />,
            handle: routeMetadata.users,
          },
        ],
      },
    ],
  },
])
