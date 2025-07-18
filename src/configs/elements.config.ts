import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

type LazyComponent<T = unknown> = LazyExoticComponent<ComponentType<T>>

export const ELEMENTS: Record<string, LazyComponent> = {
  Analytics: lazy(() => import('@/pages/app/Analytics')
    .then((m) => ({ default: m.Analytics }))),
  AppLayout: lazy(() => import('@/pages/layouts/AppLayout')
    .then((m) => ({ default: m.AppLayout }))),
  AuthLayout: lazy(() => import('@/pages/layouts/AuthLayout')
    .then((m) => ({ default: m.AuthLayout }))),
  CallbackRoute: lazy(() => import('@/pages/elements/CallbackRoute')
    .then((m) => ({ default: m.CallbackRoute }))),
  Dashboard: lazy(() => import('@/pages/app/Dashboard')
    .then((m) => ({ default: m.Dashboard }))),
  ErrorFallback: lazy(() => import('@/pages/errors/ErrorFallback')
    .then((m) => ({ default: m.ErrorFallback }))),
  ForgotPassword: lazy(() => import('@/pages/auth/ForgotPassword')
    .then((m) => ({ default: m.ForgotPassword }))),
  Login: lazy(() => import('@/pages/auth/Login')
    .then((m) => ({ default: m.Login }))),
  NotFound: lazy(() => import('@/pages/errors/NotFound')
    .then((m) => ({ default: m.NotFound }))),
  Register: lazy(() => import('@/pages/auth/Register')
    .then((m) => ({ default: m.Register }))),
  ResetPassword: lazy(() => import('@/pages/auth/ResetPassword')
    .then((m) => ({ default: m.ResetPassword }))),
  RootLayout: lazy(() => import('@/pages/layouts/RootLayout')
    .then((m) => ({ default: m.RootLayout }))),
  Users: lazy(() => import('@/pages/app/Users')
    .then((m) => ({ default: m.Users }))),
}
