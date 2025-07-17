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
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all rows'
        className='translate-y-2'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-2'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Task' />,
    cell: ({ row }) => <span>{row.getValue('id')}</span>,
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
          <span title={row.getValue('title')} className='max-w-md truncate'>
            {row.getValue('title')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.getValue('status'))

      if (!status) return null

      const Icon = status.icon

      return (
        <div className='flex items-center gap-2'>
          {Icon && <Icon className='text-muted-foreground' />}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      if (!Array.isArray(value)) return false
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Priority' />,
    cell: ({ row }) => {
      const priority = priorities.find((priority) => priority.value === row.getValue('priority'))

      if (!priority) return null

      const Icon = priority.icon

      return (
        <div className='flex items-center gap-2'>
          {Icon && <Icon className='text-muted-foreground' />}
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      if (!Array.isArray(value)) return false
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
