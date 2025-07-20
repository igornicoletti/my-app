import {
  CaretUpDownIcon,
  EyeSlashIcon,
  SortAscendingIcon,
  SortDescendingIcon
} from '@phosphor-icons/react'
import type { Column } from '@tanstack/react-table'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components'

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export const DataTableColumnHeader = <TData, TValue>({ column, title }: DataTableColumnHeaderProps<TData, TValue>) => {
  if (!column.getCanSort()) {
    return <div className='text-sm font-semibold'>{title}</div>
  }

  const sortIcon = column.getIsSorted() === 'desc'
    ? <SortDescendingIcon /> : column.getIsSorted() === 'asc'
      ? <SortAscendingIcon /> : <CaretUpDownIcon />

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='-ml-3'>
          {title}
          {sortIcon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='w-48'>
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <SortAscendingIcon />
          Ascending
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <SortDescendingIcon />
          Descending
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
          <EyeSlashIcon />
          Hide
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
