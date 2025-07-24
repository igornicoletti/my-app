export const authConfig = {
  'login': {
    heading: 'Sign in to your account',
    subheading: 'Welcome back! Please sign in to continue.',
    question: 'Don’t have an account?',
    linkLabel: 'Sign up',
    linkTo: '/register',
  },
  'register': {
    heading: 'Create your account',
    subheading: 'Welcome! Please fill in the details to get started.',
    question: 'Already have an account?',
    linkLabel: 'Sign in',
    linkTo: '/login',
  },
  'forgot-password': {
    heading: 'Forgot your password?',
    subheading: 'We’ll send you a link to reset it.',
    question: 'Back to',
    linkLabel: 'Sign in',
    linkTo: '/login',
  },
  'reset-password': {
    heading: 'Reset your password',
    subheading: 'Set a new password for your account.',
    question: 'Back to',
    linkLabel: 'Sign in',
    linkTo: '/login',
  },
} as const
