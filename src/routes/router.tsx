import { appHero, authHero } from '@/constants/heroes'
import { routeLazy } from '@/routes/lazy'
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
            handle: authHero.login,
          },
          {
            path: 'register',
            element: <routeLazy.AuthRegister />,
            handle: authHero.register,
          },
          {
            path: 'forgot-password',
            element: <routeLazy.AuthForgot />,
            handle: authHero['forgot-password'],
          },
          {
            path: 'reset-password',
            element: <routeLazy.AuthReset />,
            handle: authHero['reset-password'],
          },
        ],
      },
      {
        element: <routeLazy.LayoutApp />,
        children: [
          {
            path: 'dashboard',
            element: <routeLazy.AppDashboard />,
            handle: appHero.dashboard,
          },
          {
            path: 'tasks',
            element: <routeLazy.AppTask />,
            handle: appHero.tasks,
          },
          {
            path: 'users',
            element: <routeLazy.AppUser />,
            handle: appHero.users,
          },
        ],
      },
    ],
  },
])
