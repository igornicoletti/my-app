export const HANDLES = {
  // Public routes
  login: {
    title: 'Login',
    description: 'Access your account securely with your email and password.',
  },
  register: {
    title: 'Create Account',
    description: 'Sign up to create your account and start using the platform.',
  },
  forgotPassword: {
    title: 'Recover Password',
    description: 'Enter your email to receive a password reset link.',
  },
  resetPassword: {
    title: 'Set New Password',
    description: 'Choose a new password to access your account.',
  },
  // Protected routes
  dashboard: {
    crumb: 'Dashboard',
    title: 'Dashboard',
    description: 'Overview of your activity, performance, and quick access to key features.',
  },
  user: {
    crumb: 'User',
    title: 'User',
    description: 'Lorem ipsum dolor sit amet.',
  },
} as const

export type RouteHandleKey = keyof typeof HANDLES

export type RouteHandle = (typeof HANDLES)[RouteHandleKey]
