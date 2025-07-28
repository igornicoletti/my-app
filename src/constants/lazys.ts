import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

type LazyProps<T = unknown> = LazyExoticComponent<ComponentType<T>>

export const LAZY = {
  AppLayout: lazy(() =>
    import('@/features/layouts/AppLayout')
      .then(m => ({ default: m.AppLayout }))),
  AuthLayout: lazy(() =>
    import('@/features/layouts/AuthLayout')
      .then(m => ({ default: m.AuthLayout }))),
  CallbackRoute: lazy(() =>
    import('@/features/guards/CallbackRoute')
      .then(m => ({ default: m.CallbackRoute }))),
  Dashboard: lazy(() =>
    import('@/features/app/dashboard/Dashboard')
      .then(m => ({ default: m.Dashboard }))),
  ErrorFallback: lazy(() =>
    import('@/features/errors/ErrorFallback')
      .then(m => ({ default: m.ErrorFallback }))),
  ForgotPassword: lazy(() =>
    import('@/features/auth/pages/ForgotPassword')
      .then(m => ({ default: m.ForgotPassword }))),
  Login: lazy(() =>
    import('@/features/auth/pages/Login')
      .then(m => ({ default: m.Login }))),
  NotFound: lazy(() =>
    import('@/features/errors/NotFound')
      .then(m => ({ default: m.NotFound }))),
  Register: lazy(() =>
    import('@/features/auth/pages/Register')
      .then(m => ({ default: m.Register }))),
  ResetPassword: lazy(() =>
    import('@/features/auth/pages/ResetPassword')
      .then(m => ({ default: m.ResetPassword }))),
  RootLayout: lazy(() =>
    import('@/features/layouts/RootLayout')
      .then(m => ({ default: m.RootLayout }))),
  Tasks: lazy(() =>
    import('@/features/app/tasks/Tasks')
      .then(m => ({ default: m.Tasks }))),
  Users: lazy(() =>
    import('@/features/app/users/Users')
      .then(m => ({ default: m.Users }))),
} satisfies Record<string, LazyProps>
