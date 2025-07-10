import type { ComponentType, LazyExoticComponent } from 'react'
import { lazy } from 'react'

type LazyComponent<T = unknown> = LazyExoticComponent<ComponentType<T>>

export const ROUTE_ELEMENTS: Record<string, LazyComponent> = {
  // Auth
  Login: lazy(() => import('@/pages/auth/Login').then((m) => ({ default: m.Login }))),
  Register: lazy(() => import('@/pages/auth/Register').then((m) => ({ default: m.Register }))),
  ForgotPassword: lazy(() => import('@/pages/auth/ForgotPassword').then((m) => ({ default: m.ForgotPassword }))),
  ResetPassword: lazy(() => import('@/pages/auth/ResetPassword').then((m) => ({ default: m.ResetPassword }))),
  Callback: lazy(() => import('@/pages/auth/Callback').then((m) => ({ default: m.Callback }))),

  // App (protected)
  Dashboard: lazy(() => import('@/pages/app/Dashboard').then((m) => ({ default: m.Dashboard }))),
  Analytics: lazy(() => import('@/pages/app/Analytics').then((m) => ({ default: m.Analytics }))),

  // Layouts
  RootLayout: lazy(() => import('@/pages/layouts/RootLayout').then((m) => ({ default: m.RootLayout }))),
  AuthLayout: lazy(() => import('@/pages/layouts/AuthLayout').then((m) => ({ default: m.AuthLayout }))),
  AppLayout: lazy(() => import('@/pages/layouts/AppLayout').then((m) => ({ default: m.AppLayout }))),

  // Errors
  NotFound: lazy(() => import('@/pages/errors/NotFound').then((m) => ({ default: m.NotFound }))),
  ErrorFallback: lazy(() => import('@/pages/errors/ErrorFallback').then((m) => ({ default: m.ErrorFallback }))),
}
