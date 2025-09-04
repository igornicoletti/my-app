import { type Table } from '@tanstack/react-table'
import type { ComponentProps, ReactNode } from 'react'

import { ViewOptions } from '@/components/table/view-options'
import { cn } from '@/lib/utils'

interface AdvancedToolbarProps<TData> extends ComponentProps<'div'> {
  table: Table<TData>
  children?: ReactNode
}

export const AdvancedToolbar = <TData,>({
  table,
  children,
  className,
  ...props
}: AdvancedToolbarProps<TData>) => (
  <div
    role='toolbar'
    aria-orientation='horizontal'
    className={cn('flex w-full items-start justify-between gap-2 p-1', className)}
    {...props}>
    <div className='flex flex-1 flex-wrap items-center gap-2'>
      {children}
    </div>
    <div className='flex items-center gap-2'>
      <ViewOptions table={table} />
    </div>
  </div>
)
