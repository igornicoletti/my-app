import {
  ArrowDownIcon,
  ArrowsDownUpIcon,
  ArrowUpIcon
} from '@phosphor-icons/react'
import type { Column } from '@tanstack/react-table'

import {
  Button
} from '@/components'

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export const DataTableColumnHeader = <TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  const sorted = column.getIsSorted()

  if (!column.getCanSort()) {
    return <div className='text-sm font-semibold'>{title}</div>
  }

  const sortIcon = sorted === 'desc'
    ? <ArrowDownIcon className='text-muted-foreground' />
    : sorted === 'asc'
      ? <ArrowUpIcon className='text-muted-foreground' />
      : <ArrowsDownUpIcon className='text-muted-foreground' />

  return (
    <Button onClick={() => column.toggleSorting()} variant='none' className='-ml-3'>
      {title}
      {sortIcon}
    </Button>
  )
}
