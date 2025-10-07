import type { AppHero, AuthHero } from '@/types/hero'

export const authHero = {
  'login': {
    heading: 'Sign in to 2Ti',
    subheading: 'Welcome back! Please sign in to continue',
    question: 'Don’t have an account?',
    linkLabel: 'Sign up',
    linkTo: '/register',
  },
  'register': {
    heading: 'Create your account',
    subheading: 'Welcome! Please fill in the details to get started',
    question: 'Already have an account?',
    linkLabel: 'Sign in',
    linkTo: '/login',
  },
  'forgot-password': {
    heading: 'Recover password',
    subheading: 'Enter your email to receive a password reset link',
    question: 'Back to',
    linkLabel: 'Sign in',
    linkTo: '/login',
  },
  'reset-password': {
    heading: 'Set New Password',
    subheading: 'Choose a new password to access your account',
    question: 'Back to',
    linkLabel: 'Sign in',
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
