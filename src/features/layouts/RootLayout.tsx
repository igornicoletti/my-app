import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import {
  CommandMenu,
  KeyboardShortcut,
  LoadingSpinner,
  MetadataHelmet,
  ProgressBar,
} from '@/components/common'
import { Toaster } from '@/components/ui/sonner'

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
