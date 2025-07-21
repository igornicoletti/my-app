import { ColumnsIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components'

const formatColumnLabel = (id: string) =>
  id.replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ').replace(/\s+/g, ' ').trim()

export const CustomizeColumns = <TData,>({ table }: { table: Table<TData> }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant='outline' className='ml-auto'>
        <ColumnsIcon />
        Columns
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align='end' className='w-48'>
      <DropdownMenuLabel className='text-muted-foreground'>Toggle Visibility</DropdownMenuLabel>
      {table.getAllColumns().filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide()).map((column) => (
        <DropdownMenuCheckboxItem
          key={column.id}
          checked={column.getIsVisible()}
          onCheckedChange={(value) => column.toggleVisibility(!!value)}>
          <span className='capitalize truncate'>{formatColumnLabel(column.id)}</span>
        </DropdownMenuCheckboxItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
)
