import { ColumnHeader, RowActions } from '@/components/datatable'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { getActionIcon, getPriorityIcon, getStatusIcon, tasksSchemas, type TTaskProps } from '@/features/app/tasks'
import { dateRangeFilter, dateTimeFormat } from '@/utils'
import { CaretUpDownIcon, CircleDashedIcon } from '@phosphor-icons/react'
import type { ColumnDef } from '@tanstack/react-table'

export const tasksColumns = ({
  statusCounts,
  priorityCounts
}: {
  statusCounts: Record<string, number>
  priorityCounts: Record<string, number>
}): ColumnDef<TTaskProps>[] => [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all' />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row' />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'code',
      header: ({ column }) => <ColumnHeader column={column} title='Tasks' />,
      cell: ({ row }) => row.getValue('code'),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => <ColumnHeader column={column} title='Title' />,
      cell: ({ row }) => (
        <div className='flex items-center gap-2'>
          {row.original.label && (
            <Badge variant='outline'>
              {row.original.label}
            </Badge>
          )}
          <span className='max-w-sm truncate inline-block'>
            {row.getValue('title')}
          </span>
        </div>
      ),
      meta: {
        label: 'Title',
        placeholder: 'Search titles...',
        variant: 'text',
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <ColumnHeader column={column} title='Status' />,
      cell: ({ cell }) => {
        const value = cell.getValue<TTaskProps['status']>()
        const Icon = getStatusIcon(value)
        return (
          <div className='flex items-center gap-2'>
            <Icon />
            <span className='capitalize'>{value}</span>
          </div>
        )
      },
      meta: {
        label: 'Status',
        variant: 'multiSelect',
        icon: CircleDashedIcon,
        options: tasksSchemas.shape.status._def.values.map((status) => ({
          label: status.charAt(0).toUpperCase() + status.slice(1),
          value: status,
          icon: getStatusIcon(status),
          count: statusCounts[status] ?? 0, // INJETANDO CONTAGEM AQUI
        })),
      },
      enableColumnFilter: true,
      filterFn: (row, columnId, filterValue) => {
        const value = row.getValue<string>(columnId)
        return Array.isArray(filterValue) ? filterValue.includes(value) : true
      },
    },
    {
      accessorKey: 'priority',
      header: ({ column }) => <ColumnHeader column={column} title='Priority' />,
      cell: ({ cell }) => {
        const value = cell.getValue<TTaskProps['priority']>()
        const Icon = getPriorityIcon(value)
        return (
          <div className='flex items-center gap-2'>
            <Icon />
            <span className='capitalize'>{value}</span>
          </div>
        )
      },
      meta: {
        label: 'Priority',
        variant: 'multiSelect',
        icon: CaretUpDownIcon,
        options: tasksSchemas.shape.priority._def.values.map((priority) => ({
          label: priority.charAt(0).toUpperCase() + priority.slice(1),
          value: priority,
          icon: getPriorityIcon(priority),
          count: priorityCounts[priority] ?? 0, // INJETANDO CONTAGEM AQUI
        })),
      },
      enableColumnFilter: true,
      filterFn: (row, columnId, filterValue) => {
        const value = row.getValue<string>(columnId)
        return Array.isArray(filterValue) ? filterValue.includes(value) : true
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <ColumnHeader column={column} title='Created At' />,
      cell: ({ cell }) => {
        const value = cell.getValue<Date>()
        return value instanceof Date && !isNaN(value.getTime())
          ? dateTimeFormat(value)
          : '-'
      },
      enableColumnFilter: true,
      meta: {
        label: 'Created At',
        variant: 'date',
      },
      filterFn: dateRangeFilter,
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <RowActions
          actions={[
            {
              type: 'item',
              label: 'Edit',
              icon: getActionIcon('edit'),
              onSelect: () => console.log('Edit row:', row.original),
            },
            {
              type: 'radio-group',
              label: 'Labels',
              icon: getActionIcon('label'),
              value: row.original.label || '',
              onChange: (value) => console.log('Update label:', value),
              options: tasksSchemas.shape.label._def.values.map((label) => ({
                label,
                value: label,
              })),
            },
            {
              type: 'item',
              label: 'Delete',
              icon: getActionIcon('delete'),
              onSelect: () => console.log('Delete row:', row.original),
            },
          ]}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ]
