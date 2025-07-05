import { lazy } from 'react'

export const ROUTE = {
  Analytics: lazy(() => import('@/pages/app/Analytics')
    .then(m => ({ default: m.Analytics }))),
  Dashboard: lazy(() => import('@/pages/app/Dashboard')
    .then(m => ({ default: m.Dashboard }))),
  Profile: lazy(() => import('@/pages/app/Profile')
    .then(m => ({ default: m.Profile }))),
  Settings: lazy(() => import('@/pages/app/Settings')
    .then(m => ({ default: m.Settings }))),
  Login: lazy(() => import('@/pages/auth/Login')
    .then(m => ({ default: m.Login }))),
  Callback: lazy(() => import('@/pages/auth/Callback')
    .then(m => ({ default: m.Callback }))),
  Register: lazy(() => import('@/pages/auth/Register')
    .then(m => ({ default: m.Register }))),
  ForgotPassword: lazy(() => import('@/pages/auth/ForgotPassword')
    .then(m => ({ default: m.ForgotPassword }))),
  ResetPassword: lazy(() => import('@/pages/auth/ResetPassword')
    .then(m => ({ default: m.ResetPassword }))),
  NotFound: lazy(() => import('@/pages/errors/NotFound')
    .then(m => ({ default: m.NotFound }))),
  ErrorFallback: lazy(() => import('@/pages/errors/ErrorFallback')
    .then(m => ({ default: m.ErrorFallback }))),
  RootLayout: lazy(() => import('@/pages/layouts/RootLayout')
    .then(m => ({ default: m.RootLayout }))),
  AuthLayout: lazy(() => import('@/pages/layouts/AuthLayout')
    .then(m => ({ default: m.AuthLayout }))),
  AppLayout: lazy(() => import('@/pages/layouts/AppLayout')
    .then(m => ({ default: m.AppLayout })))
}