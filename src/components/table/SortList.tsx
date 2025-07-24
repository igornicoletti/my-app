import { ArrowsDownUpIcon } from '@phosphor-icons/react'
import type { Column } from '@tanstack/react-table'

import { Button } from '@/components'

interface SortListProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export const SortList = <TData, TValue>({
  column, title
}: SortListProps<TData, TValue>) => {
  if (!column.getCanSort()) {
    return <div className='text-sm'>{title}</div>
  }

  return (
    <Button onClick={() => column.toggleSorting()} variant='none' className='-ml-2'>
      <ArrowsDownUpIcon /> {title}
    </Button>
  )
}
