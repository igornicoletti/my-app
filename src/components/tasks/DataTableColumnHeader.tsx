import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretUpDownIcon,
  EyeSlashIcon
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
    return <div className='text-sm font-medium'>{title}</div>
  }

  const sortIcon = column.getIsSorted() === 'desc'
    ? <ArrowDownIcon />
    : column.getIsSorted() === 'asc'
      ? <ArrowUpIcon />
      : <CaretUpDownIcon />

  return (
    <div className='flex items-center gap-2'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size='sm'
            variant='ghost'
            className='data-[state=open]:bg-accent -ml-3 h-8'
            aria-label={`Sort column ${title}`}>
            <span>{title}</span>
            {sortIcon}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem
            onClick={() => column.toggleSorting(false)}
            aria-label='Sort ascending'
            className='flex items-center gap-2'>
            <ArrowUpIcon /> Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => column.toggleSorting(true)}
            aria-label='Sort descending'
            className='flex items-center gap-2'>
            <ArrowDownIcon /> Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => column.toggleVisibility(false)}
            aria-label='Hide column'
            className='flex items-center gap-2'>
            <EyeSlashIcon /> Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
