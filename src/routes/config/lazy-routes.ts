import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

const lazyImport = <
  M extends Record<string, ComponentType<any>>,
  K extends keyof M
>(
  factory: () => Promise<M>,
  name: K
): LazyExoticComponent<M[K]> => lazy(() =>
  factory().then((module) => ({
    default: module[name]
  }))
)

export const routeLazy = {
  ForgotPasswordPage: lazyImport(() => import('@/features/auth/pages/forgot-password'), 'ForgotPasswordPage'),
  LoginPage: lazyImport(() => import('@/features/auth/pages/login'), 'LoginPage'),
  RegisterPage: lazyImport(() => import('@/features/auth/pages/register'), 'RegisterPage'),
  ResetPasswordPage: lazyImport(() => import('@/features/auth/pages/reset-password'), 'ResetPasswordPage'),

  DashboardPage: lazyImport(() => import('@/features/app/dashboard/dashboard'), 'DashboardPage'),
  TasksPage: lazyImport(() => import('@/features/app/tasks/tasks'), 'TasksPage'),
  UsersPage: lazyImport(() => import('@/features/app/users/users'), 'UsersPage'),

  ErrorFallback: lazyImport(() => import('@/features/errors/error-fallback'), 'ErrorFallback'),
  NotFoundPage: lazyImport(() => import('@/features/errors/not-found'), 'NotFoundPage'),

  AppLayout: lazyImport(() => import('@/features/layouts/app-layout'), 'AppLayout'),
  AuthLayout: lazyImport(() => import('@/features/layouts/auth-layout'), 'AuthLayout'),
  RootLayout: lazyImport(() => import('@/features/layouts/root-layout'), 'RootLayout'),
}
