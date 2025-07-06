import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { LoadingSpinner, ProgressBar } from '@/components'
import { useMeta } from '@/hooks'

export const RootLayout = () => {
  useMeta()

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProgressBar />
      <Outlet />
    </Suspense>
  )
}
