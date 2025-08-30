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
  AppLayout: lazyImport(() => import('@/features/layouts/AppLayout'), 'AppLayout'),
  AuthLayout: lazyImport(() => import('@/features/layouts/AuthLayout'), 'AuthLayout'),
  DashboardPage: lazyImport(() => import('@/features/app/dashboard/DashboardPage'), 'DashboardPage'),
  ErrorFallback: lazyImport(() => import('@/features/errors/ErrorFallback'), 'ErrorFallback'),
  ForgotPasswordPage: lazyImport(() => import('@/features/auth/pages/ForgotPasswordPage'), 'ForgotPasswordPage'),
  LoginPage: lazyImport(() => import('@/features/auth/pages/LoginPage'), 'LoginPage'),
  NotFoundPage: lazyImport(() => import('@/features/errors/NotFoundPage'), 'NotFoundPage'),
  RegisterPage: lazyImport(() => import('@/features/auth/pages/RegisterPage'), 'RegisterPage'),
  ResetPasswordPage: lazyImport(() => import('@/features/auth/pages/ResetPasswordPage'), 'ResetPasswordPage'),
  RootLayout: lazyImport(() => import('@/features/layouts/RootLayout'), 'RootLayout'),
  TasksPage: lazyImport(() => import('@/features/app/tasks/TasksPage'), 'TasksPage'),
  UsersPage: lazyImport(() => import('@/features/app/users/UsersPage'), 'UsersPage'),
}
