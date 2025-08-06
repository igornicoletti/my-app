import { ColumnHeader, RowActions } from '@/components/datatable'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { getActionIcon, getPriorityIcon, getStatusIcon, tasksSchemas, type TTaskProps, type TTasksColumnsProps } from '@/features/app/tasks'
import { dateRangeFilter, dateTimeFormat, multiSelectFilter } from '@/utils'
import { CalendarBlankIcon, TextAaIcon } from '@phosphor-icons/react'
import type { ColumnDef } from '@tanstack/react-table'

export const tasksColumns = ({
  statusCounts,
  priorityCounts,
  onDeleteTask
}: TTasksColumnsProps): ColumnDef<TTaskProps>[] => [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40,
    },
    {
      id: 'code',
      accessorKey: 'code',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Tasks' />
      ),
      cell: ({ row }) => row.getValue('code'),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'title',
      accessorKey: 'title',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Title' />
      ),
      cell: ({ row }) => {
        const task = row.original
        return (
          <div className='w-full flex items-center gap-2'>
            {task.label && <Badge variant='outline'>{task.label}</Badge>}
            <span className='max-w-lg truncate'>{row.getValue('title')}</span>
          </div>
        )
      },
      meta: {
        label: 'Title',
        placeholder: 'Search titles...',
        variant: 'text',
        icon: TextAaIcon
      },
      enableColumnFilter: true
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Status' />
      ),
      cell: ({ cell }) => {
        const status = cell.getValue<TTaskProps['status']>()
        const Icon = getStatusIcon(status)
        return (
          <div className='flex items-center gap-2'>
            <Icon />
            <span className='capitalize'>{status}</span>
          </div>
        )
      },
      meta: {
        label: 'Status',
        variant: 'multiSelect',
        options: tasksSchemas.shape.status._def.values.map((status) => ({
          label: status.charAt(0).toUpperCase() + status.slice(1),
          value: status,
          count: statusCounts[status] ?? 0,
          icon: getStatusIcon(status),
        })),
      },
      enableColumnFilter: true,
      filterFn: multiSelectFilter,
    },
    {
      id: 'priority',
      accessorKey: 'priority',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Priority' />
      ),
      cell: ({ cell }) => {
        const priority = cell.getValue<TTaskProps['priority']>()
        const Icon = getPriorityIcon(priority)
        return (
          <div className='flex items-center gap-2'>
            <Icon />
            <span className='capitalize'>{priority}</span>
          </div>
        )
      },
      meta: {
        label: 'Priority',
        variant: 'multiSelect',
        options: tasksSchemas.shape.priority._def.values.map((priority) => ({
          label: priority.charAt(0).toUpperCase() + priority.slice(1),
          value: priority,
          count: priorityCounts[priority] ?? 0,
          icon: getPriorityIcon(priority),
        }))
      },
      enableColumnFilter: true,
      filterFn: multiSelectFilter,
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Created At' />
      ),
      cell: ({ cell }) => dateTimeFormat(cell.getValue<Date>()),
      meta: {
        label: 'Created At',
        variant: 'date',
        icon: CalendarBlankIcon,
      },
      enableColumnFilter: true,
      filterFn: dateRangeFilter,
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const task = row.original
        return (
          <RowActions actions={[
            {
              type: 'item',
              label: 'Edit',
              icon: getActionIcon('edit'),
              onSelect: () => console.log('Edit row:', task),
            },
            {
              type: 'radio-group',
              label: 'Labels',
              icon: getActionIcon('label'),
              value: task.label || '',
              onChange: (value) => console.log('Update label:', value),
              options: tasksSchemas.shape.label._def.values.map((label) => ({
                label,
                value: label,
              })),
            },
            {
              type: 'confirm',
              label: 'Delete',
              icon: getActionIcon('delete'),
              onConfirm: () => onDeleteTask(task.id),
            },
          ]} />
        )
      },
      enableSorting: false,
      enableHiding: false,
      size: 40,
    }
  ]
