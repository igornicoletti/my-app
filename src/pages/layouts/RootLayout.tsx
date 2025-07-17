import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import {
  CommandMenu,
  ConfirmDialog,
  HelmetMetadata,
  LoadingSpinner,
  ProgressBar,
  Toaster
} from '@/components'

export const RootLayout = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HelmetMetadata />
      <ProgressBar />
      <Outlet />
      <CommandMenu />
      <ConfirmDialog />
      <Toaster />
    </Suspense>
  )
}
