import type { RouteObject } from 'react-router-dom'

import { ROUTE } from '@/configs'

export const getPublicRoutes = (): RouteObject[] => [
  {
    element: <ROUTE.AuthLayout />,
    errorElement: <ROUTE.ErrorFallback />,
    children: [
      {
        path: 'login',
        element: <ROUTE.Login />,
        handle: {
          title: 'Login',
          description: 'Access your account securely with your email and password.'
        }
      },
      {
        path: 'register',
        element: <ROUTE.Register />,
        handle: {
          title: 'Create Account',
          description: 'Sign up to create your account and start using the platform.'
        }
      },
      {
        path: 'forgot-password',
        element: <ROUTE.ForgotPassword />,
        handle: {
          title: 'Recover Password',
          description: 'Enter your email to receive a password reset link.'
        }
      },
      {
        path: 'reset-password',
        element: <ROUTE.ResetPassword />,
        handle: {
          title: 'Set New Password',
          description: 'Choose a new password to access your account.'
        }
      }
    ]
  }
]
