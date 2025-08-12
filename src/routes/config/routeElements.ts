import { lazy } from 'react'

const AppLayout = lazy(() => import('@/features/layouts/AppLayout').then(m => ({ default: m.AppLayout })))
const AuthLayout = lazy(() => import('@/features/layouts/AuthLayout').then(m => ({ default: m.AuthLayout })))
const CallbackRoute = lazy(() => import('@/features/guards/CallbackRoute').then(m => ({ default: m.CallbackRoute })))
const DashboardPage = lazy(() => import('@/features/app/dashboard/DashboardPage').then(m => ({ default: m.DashboardPage })))
const ErrorFallback = lazy(() => import('@/features/errors/ErrorFallback').then(m => ({ default: m.ErrorFallback })))
const ForgotPasswordPage = lazy(() => import('@/features/auth/pages/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })))
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage').then(m => ({ default: m.LoginPage })))
const NotFoundPage = lazy(() => import('@/features/errors/NotFoundPage').then(m => ({ default: m.NotFoundPage })))
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage').then(m => ({ default: m.RegisterPage })))
const ResetPasswordPage = lazy(() => import('@/features/auth/pages/ResetPasswordPage').then(m => ({ default: m.ResetPasswordPage })))
const RootLayout = lazy(() => import('@/features/layouts/RootLayout').then(m => ({ default: m.RootLayout })))
const TasksPage = lazy(() => import('@/features/app/tasks/TasksPage').then(m => ({ default: m.TasksPage })))
const UsersPage = lazy(() => import('@/features/app/users/UsersPage').then(m => ({ default: m.UsersPage })))

export const routeElements = {
  AppLayout,
  AuthLayout,
  CallbackRoute,
  DashboardPage,
  ErrorFallback,
  ForgotPasswordPage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
  ResetPasswordPage,
  RootLayout,
  TasksPage,
  UsersPage,
} satisfies Record<string, LazyExoticComponent<React.ComponentType<any>>>

type LazyExoticComponent<T extends React.ComponentType<any>> = React.LazyExoticComponent<T>
