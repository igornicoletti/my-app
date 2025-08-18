import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

const lazyImport = <T extends ComponentType<any>>(
  factory: () => Promise<Record<string, T>>
): LazyExoticComponent<T> =>
  lazy(async () => {
    const module = await factory()
    const key = Object.keys(module)[0] as string
    return { default: module[key] as T }
  })

export const routeLazy = {
  AppLayout: lazyImport(() => import('@/features/layouts/AppLayout')),
  AuthLayout: lazyImport(() => import('@/features/layouts/AuthLayout')),
  DashboardPage: lazyImport(() => import('@/features/app/dashboard/DashboardPage')),
  ErrorFallback: lazyImport(() => import('@/features/errors/ErrorFallback')),
  ForgotPasswordPage: lazyImport(() => import('@/features/auth/pages/ForgotPasswordPage')),
  LoginPage: lazyImport(() => import('@/features/auth/pages/LoginPage')),
  NotFoundPage: lazyImport(() => import('@/features/errors/NotFoundPage')),
  RegisterPage: lazyImport(() => import('@/features/auth/pages/RegisterPage')),
  ResetPasswordPage: lazyImport(() => import('@/features/auth/pages/ResetPasswordPage')),
  RootLayout: lazyImport(() => import('@/features/layouts/RootLayout')),
  TasksPage: lazyImport(() => import('@/features/app/tasks/TasksPage')),
  UsersPage: lazyImport(() => import('@/features/app/users/UsersPage')),
}
