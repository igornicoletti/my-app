export type HeroContent = {
  heading: string
  subheading: string
  question: string
  linkLabel: string
  linkTo: string
}

export const HERO = {
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
    linkLabel: 'Login',
    linkTo: '/login',
  },
  'forgot-password': {
    heading: 'Forgot your password?',
    subheading: 'We’ll send you a link to reset it.',
    question: 'Back to',
    linkLabel: 'Login',
    linkTo: '/login',
  },
  'reset-password': {
    heading: 'Reset your password',
    subheading: 'Set a new password for your account.',
    question: 'Back to',
    linkLabel: 'Login',
    linkTo: '/login',
  },
} as const

export type HeroSectionKey = keyof typeof HERO
