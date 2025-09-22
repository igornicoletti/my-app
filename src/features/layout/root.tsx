import { CommonCommand } from '@/components/common/command'
import { CommonLoading } from '@/components/common/loading'
import { CommonMetadata } from '@/components/common/metadata'
import { CommonProgress } from '@/components/common/progress'
import { CommonShortcut } from '@/components/common/shortcut'
import { Toaster } from '@/components/ui/sonner'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

export const LayoutRoot = () => (
  <Suspense fallback={<CommonLoading message='Loading...' />}>
    <CommonMetadata />
    <CommonShortcut />
    <CommonProgress />
    <Outlet />
    <CommonCommand />
    <Toaster />
  </Suspense>
)
