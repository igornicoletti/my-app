type Props = {
  title: string
  description: string
  crumb?: string
}

export const routeMeta = {
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
  dashboard: {
    crumb: 'Dashboard',
    title: 'Dashboard',
    description: 'Overview of your activity, performance, and quick access to key features.',
  },
  users: {
    crumb: 'Users',
    title: 'Users',
    description: 'Lorem ipsum dolor sit amet.',
  },
  tasks: {
    crumb: 'Tasks',
    title: 'Tasks',
    description: 'Lorem ipsum dolor sit amet.',
  },
} satisfies Record<string, Props>
