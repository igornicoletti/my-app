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
  PageForgot: lazyImport(() => import('@/features/auth/pages/forgot'), 'PageForgot'),
  PageLogin: lazyImport(() => import('@/features/auth/pages/login'), 'PageLogin'),
  PageRegister: lazyImport(() => import('@/features/auth/pages/register'), 'PageRegister'),
  PageReset: lazyImport(() => import('@/features/auth/pages/reset'), 'PageReset'),

  DashboardPage: lazyImport(() => import('@/features/app/dashboard/dashboard'), 'DashboardPage'),
  TasksPage: lazyImport(() => import('@/features/app/tasks/tasks'), 'TasksPage'),
  UsersPage: lazyImport(() => import('@/features/app/users/users'), 'UsersPage'),

  ErrorFallback: lazyImport(() => import('@/features/error/error-fallback'), 'ErrorFallback'),
  NotFoundPage: lazyImport(() => import('@/features/error/not-found'), 'NotFoundPage'),

  LayoutApp: lazyImport(() => import('@/features/layout/app'), 'LayoutApp'),
  LayoutAuth: lazyImport(() => import('@/features/layout/auth'), 'LayoutAuth'),
  LayoutRoot: lazyImport(() => import('@/features/layout/root'), 'LayoutRoot'),
}
