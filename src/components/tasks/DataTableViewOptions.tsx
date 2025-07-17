import { SlidersHorizontalIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components'

// Utility to format column ID to label (e.g., 'user_name' -> 'User Name')
const formatColumnLabel = (id: string) =>
  id
    .replace(/([A-Z])/g, ' $1')     // insert space before capital letters
    .replace(/[_-]/g, ' ')          // replace underscores/hyphens with space
    .replace(/\s+/g, ' ')           // normalize spacing
    .trim()
    .replace(/^./, (char) => char.toUpperCase())

export const DataTableViewOptions = <TData,>({ table }: { table: Table<TData> }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        size='sm'
        variant='outline'
        className='ml-auto hidden h-8 lg:flex'
        aria-label='Toggle table view options'>
        <SlidersHorizontalIcon />
        View
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align='end' className='w-48'>
      <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {table
        .getAllColumns()
        .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
        .map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            className='capitalize'
            checked={column.getIsVisible()}
            onCheckedChange={(value) => column.toggleVisibility(!!value)}>
            {formatColumnLabel(column.id)}
          </DropdownMenuCheckboxItem>
        ))}
    </DropdownMenuContent>
  </DropdownMenu>
)
