import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

const lazyImport = <
  M extends Record<string, ComponentType<any>>,
  K extends keyof M
>(factory: () => Promise<M>, name: K): LazyExoticComponent<M[K]> => {
  return lazy(() =>
    factory().then((module) => ({
      default: module[name],
    }))
  )
}

export const routeLazy = {
  AppDashboard: lazyImport(() => import('@/features/app/dashboard/dashboard'), 'AppDashboard'),
  AppTask: lazyImport(() => import('@/features/app/task/task'), 'AppTask'),
  AppUser: lazyImport(() => import('@/features/app/user/user'), 'AppUser'),
  AuthForgot: lazyImport(() => import('@/features/auth/forgot'), 'AuthForgot'),
  AuthLogin: lazyImport(() => import('@/features/auth/login'), 'AuthLogin'),
  AuthRegister: lazyImport(() => import('@/features/auth/register'), 'AuthRegister'),
  AuthReset: lazyImport(() => import('@/features/auth/reset'), 'AuthReset'),
  LayoutApp: lazyImport(() => import('@/features/layout/app'), 'LayoutApp'),
  LayoutAuth: lazyImport(() => import('@/features/layout/auth'), 'LayoutAuth'),
  LayoutRoot: lazyImport(() => import('@/features/layout/root'), 'LayoutRoot'),
  RootFallback: lazyImport(() => import('@/features/root/fallback'), 'RootFallback'),
  RootRedirect: lazyImport(() => import('@/features/root/redirect'), 'RootRedirect'),
  RootCallback: lazyImport(() => import('@/features/root/callback'), 'RootCallback'),
}
