import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import {
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
      <Toaster />
    </Suspense>
  )
}
