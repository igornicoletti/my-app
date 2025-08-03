import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import {
  CommandMenu,
  HelmetMetadata,
  KeyboardShortcut,
  LoadingSpinner,
  ProgressBar,
  Toaster
} from '@/components'

export const RootLayout = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <HelmetMetadata />
    <KeyboardShortcut />
    <ProgressBar />
    <Outlet />
    <CommandMenu />
    <Toaster />
  </Suspense>
)
