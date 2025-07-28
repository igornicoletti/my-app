import { CaretUpDownIcon, CircleDashedIcon, TextAaIcon } from '@phosphor-icons/react'
import type { ColumnDef } from '@tanstack/react-table'

import { ColumnHeader } from '@/components'
import { Badge, Checkbox } from '@/components/ui'
import { tasksSchemas } from '@/features/app/tasks/data/tasks.schemas'
import type { TaskProps } from '@/features/app/tasks/data/tasks.types'
import { getPriorityIcon, getStatusIcon } from '@/features/app/tasks/data/tasks.utils'

interface GetTasksTableColumnsProps {
  statusCounts: Record<TaskProps['status'], number>
  priorityCounts: Record<TaskProps['priority'], number>
}

export const getTasksTableColumns = ({
  statusCounts, priorityCounts
}: GetTasksTableColumnsProps): ColumnDef<TaskProps>[] => [
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
    },
    {
      id: 'code',
      accessorKey: 'code',
      header: ({ column }) => <ColumnHeader column={column} title='Task' />,
      cell: ({ row }) => <div>{row.getValue('code')}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'title',
      accessorKey: 'title',
      header: ({ column }) => <ColumnHeader column={column} title='Title' />,
      cell: ({ row }) => {
        const label = tasksSchemas.shape.label._def.values.find((label) =>
          label === row.original.label)

        return (
          <div className='flex items-center gap-2'>
            {label && (
              <Badge variant='outline' className='capitalize'>{label}</Badge>
            )}
            <span className='max-w-lg truncate'>
              {row.getValue('title')}
            </span>
          </div>
        )
      },
      meta: {
        label: 'Title',
        placeholder: 'Tasks',
        variant: 'text',
        icon: TextAaIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: ({ column }) => <ColumnHeader column={column} title='Status' />,
      cell: ({ cell }) => {
        const status = tasksSchemas.shape.status._def.values.find((status) =>
          status === cell.getValue<TaskProps['status']>())

        if (!status) return null
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
          count: statusCounts[status],
          icon: getStatusIcon(status),
        })),
        icon: CircleDashedIcon,
      },
      enableColumnFilter: true,
      filterFn: (row, columnId, filterValue) => {
        if (!Array.isArray(filterValue)) return true
        return filterValue.includes(row.getValue(columnId))
      }
    },
    {
      id: 'priority',
      accessorKey: 'priority',
      header: ({ column }) => <ColumnHeader column={column} title='Priority' />,
      cell: ({ cell }) => {
        const priority = tasksSchemas.shape.priority._def.values.find((priority) =>
          priority === cell.getValue<TaskProps['priority']>())

        if (!priority) return null
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
          count: priorityCounts[priority],
          icon: getPriorityIcon(priority),
        })),
        icon: CaretUpDownIcon,
      },
      enableColumnFilter: true,
      filterFn: (row, columnId, filterValue) => {
        if (!Array.isArray(filterValue)) return true
        return filterValue.includes(row.getValue(columnId))
      }
    },
  ]
