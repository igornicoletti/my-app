import type { AppHero, AuthHero } from '@/types/hero'

export const authHero = {
  'login': {
    heading: 'Sign In to 2Ti',
    subheading: 'Welcome back. Please sign in to continue.',
    question: 'Don’t have an account?',
    linkLabel: 'Sign Up',
    linkTo: '/register',
  },
  'register': {
    heading: 'Create Your Account',
    subheading: 'Welcome. Please fill in your details to get started.',
    question: 'Already have an account?',
    linkLabel: 'Sign In',
    linkTo: '/login',
  },
  'forgot-password': {
    heading: 'Recover Password',
    subheading: 'Enter your email to receive a password reset link.',
    question: 'Remember your password?',
    linkLabel: 'Back to Sign In',
    linkTo: '/login',
  },
  'reset-password': {
    heading: 'Set New Password',
    subheading: 'Choose a new password to access your account.',
    question: '',
    linkLabel: 'Back to Sign In',
    linkTo: '/login',
  },
} satisfies Record<string, AuthHero>

export type AuthKey = keyof typeof authHero

export const appHero = {
  'dashboard': {
    heading: 'Dashboard',
    subheading: 'Overview of your activity, performance, and quick access to key features',
  },
  'tasks': {
    heading: 'Tasks Management',
    subheading: 'Track and manage all your tasks efficiently',
  },
  'users': {
    heading: 'Users Management',
    subheading: 'Manage and view all users in the system',
  },
} satisfies Record<string, AppHero>

export type AppKey = keyof typeof appHero
