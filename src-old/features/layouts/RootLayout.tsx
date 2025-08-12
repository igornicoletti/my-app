import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import {
  CommandMenu,
  KeyboardShortcut,
  LoadingSpinner,
  MetadataHelmet,
  ProgressBar,
  Toaster
} from '@/components'

export const RootLayout = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <MetadataHelmet />
    <KeyboardShortcut />
    <ProgressBar />
    <Outlet />
    <CommandMenu />
    <Toaster />
  </Suspense>
)
