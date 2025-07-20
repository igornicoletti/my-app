import { SlidersHorizontalIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components'

// Utility to format column ID to label (e.g., 'user_name' -> 'User Name')
const formatColumnLabel = (id: string) =>
  id.replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ').replace(/\s+/g, ' ').trim()

export const DataTableViewOptions = <TData,>({ table }: { table: Table<TData> }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant='outline'>
        <SlidersHorizontalIcon />
        View
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align='end' className='w-48'>
      <DropdownMenuLabel className='text-muted-foreground text-xs'>Toggle columns</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {table.getAllColumns().filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide()).map((column) => (
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
