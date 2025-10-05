import type { AppHero, AuthHero } from '@/types/hero'

export const authHero = {
  'login': {
    heading: 'Login to Your Account',
    subheading: 'Access your account securely with your email and password.',
    question: 'Don’t have an account?',
    linkLabel: 'Sign up',
    linkTo: '/register',
  },
  'register': {
    heading: 'Create Account',
    subheading: 'Create your account and start using the platform.',
    question: 'Already have an account?',
    linkLabel: 'Log in',
    linkTo: '/login',
  },
  'forgot-password': {
    heading: 'Recover Password',
    subheading: 'Enter your email to receive a password reset link.',
    question: 'Back to',
    linkLabel: 'Log in',
    linkTo: '/login',
  },
  'reset-password': {
    heading: 'Set New Password',
    subheading: 'Choose a new password to access your account.',
    question: 'Back to',
    linkLabel: 'Log in',
    linkTo: '/login',
  },
} satisfies Record<string, AuthHero>

export type AuthKey = keyof typeof authHero

export const appHero = {
  'dashboard': {
    heading: 'Dashboard',
    subheading: 'Overview of your activity, performance, and quick access to key features.',
  },
  'tasks': {
    heading: 'Tasks Management',
    subheading: 'Track and manage all your tasks efficiently.',
  },
  'users': {
    heading: 'Users Management',
    subheading: 'Manage and view all users in the system',
  },
} satisfies Record<string, AppHero>

export type AppKey = keyof typeof appHero
