interface RouteMetadataProps {
  title: string
  description: string
  crumb?: string
}

export const routeMetadata: Record<string, RouteMetadataProps> = {
  login: {
    title: 'Login to Your Account',
    description: 'Access your account securely with your email and password.',
  },
  register: {
    title: 'Create Account',
    description: 'Create your account and start using the platform.',
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
    title: 'Dashboard',
    description: 'Overview of your activity, performance, and quick access to key features.',
  },
  tasks: {
    title: 'Tasks Management',
    description: 'Track and manage all your tasks efficiently.',
  },
  users: {
    title: 'Users Management',
    description: 'Manage and view all users in the system.',
  },
}
