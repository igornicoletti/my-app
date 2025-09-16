import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { CommandMenu } from '@/components/common/command-menu'
import { KeyboardShortcut } from '@/components/common/keyboard-shortcut'
import { LoadingSpinner } from '@/components/common/loading-spinner'
import { MetadataHelmet } from '@/components/common/metadata-helmet'
import { ProgressBar } from '@/components/common/progress-bar'
import { Toaster } from '@/components/ui/sonner'

export const RootLayout = () => (
  <Suspense fallback={<LoadingSpinner message='Loading...' />}>
    <MetadataHelmet />
    <KeyboardShortcut />
    <ProgressBar />
    <Outlet />
    <CommandMenu />
    <Toaster position='top-center' />
  </Suspense>
)
