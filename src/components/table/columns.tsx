import type { ColumnDef } from '@tanstack/react-table'

import {
  Badge,
  Checkbox,
  DataTableColumnHeader,
  DataTableRowActions,
  labels,
  priorities,
  statuses,
  type Task
} from '@/components'

export const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => <Checkbox
      checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label='Select all rows' />,
    cell: ({ row }) => <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label='Select row' />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Title' />,
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className='flex gap-2'>
          {label && <Badge variant='outline'>{label.label}</Badge>}
          <span>{row.getValue('title')}</span>
        </div>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.getValue('status'))
      if (!status) return null

      return (
        <div className='flex items-center gap-2'>
          {status.icon && <status.icon />}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      if (!Array.isArray(value)) return false
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Priority' />,
    cell: ({ row }) => {
      const priority = priorities.find((priority) => priority.value === row.getValue('priority'))
      if (!priority) return null

      return (
        <div className='flex items-center gap-2'>
          {priority.icon && <priority.icon />}
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      if (!Array.isArray(value)) return false
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
