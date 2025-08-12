import {
  CalendarIcon,
  CaretUpDownIcon,
  CircleDashedIcon,
  DotsThreeIcon,
  TextAaIcon
} from '@phosphor-icons/react'
import type { ColumnDef } from '@tanstack/react-table'

import { ColumnHeader } from '@/components/datatable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  getPriorityIcon,
  getStatusIcon,
  taskSchema,
  type TaskSchema
} from '@/features/app/tasks/datatable'
import { formatDate } from '@/lib/format'
import type { DataTableRowAction } from '@/types/datatable'

interface GetTasksTableColumnsProps {
  statusCounts: Record<TaskSchema['status'], number>
  priorityCounts: Record<TaskSchema['priority'], number>
  setRowAction: React.Dispatch<React.SetStateAction<DataTableRowAction<TaskSchema> | null>>
}

export const getTasksTableColumns = ({
  statusCounts,
  priorityCounts,
  setRowAction,
}: GetTasksTableColumnsProps): ColumnDef<TaskSchema>[] => {
  const statusValues = taskSchema.shape.status.options
  const priorityValues = taskSchema.shape.priority.options

  return [
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
          className='translate-y-0.5'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
          className='translate-y-0.5'
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
        <ColumnHeader column={column} title='Task' />
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
        const label = row.original.label
        return (
          <div className='flex items-center gap-2'>
            {label && <Badge variant='outline'>{label}</Badge>}
            <span className='max-w-[31.25rem] truncate font-medium'>
              {row.getValue('title')}
            </span>
          </div>
        )
      },
      meta: {
        label: 'Title',
        placeholder: 'Search titles...',
        variant: 'text',
        icon: TextAaIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Status' />
      ),
      cell: ({ cell }) => {
        const status = cell.getValue<TaskSchema['status']>()
        if (!status) return null
        const Icon = getStatusIcon(status)
        return (
          <Badge variant='outline' className='py-1 [&>svg]:size-3.5'>
            <Icon />
            <span className='capitalize'>{status}</span>
          </Badge>
        )
      },
      meta: {
        label: 'Status',
        variant: 'multiSelect',
        options: statusValues.map((status) => ({
          label: status.charAt(0).toUpperCase() + status.slice(1),
          value: status,
          count: statusCounts[status],
          icon: getStatusIcon(status),
        })),
        icon: CircleDashedIcon,
      },
      enableColumnFilter: true,
      filterFn: 'arrIncludesSome'
    },
    {
      id: 'priority',
      accessorKey: 'priority',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Priority' />
      ),
      cell: ({ cell }) => {
        const priority = cell.getValue<TaskSchema['priority']>()
        if (!priority) return null
        const Icon = getPriorityIcon(priority)
        return (
          <Badge variant='outline' className='py-1 [&>svg]:size-3.5'>
            <Icon />
            <span className='capitalize'>{priority}</span>
          </Badge>
        )
      },
      meta: {
        label: 'Priority',
        variant: 'multiSelect',
        options: priorityValues.map((priority) => ({
          label: priority.charAt(0).toUpperCase() + priority.slice(1),
          value: priority,
          count: priorityCounts[priority],
          icon: getPriorityIcon(priority),
        })),
        icon: CaretUpDownIcon,
      },
      enableColumnFilter: true,
      filterFn: 'arrIncludesSome'
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Created At' />
      ),
      cell: ({ cell }) => formatDate(cell.getValue<Date>()),
      meta: {
        label: 'Created At',
        variant: 'dateRange',
        icon: CalendarIcon,
      },
      enableColumnFilter: true,
      filterFn: (row, columnId, filterValue: [number | undefined, number | undefined]) => {
        const rowValue = row.getValue<Date>(columnId)
        if (!rowValue) return false

        const [from, to] = filterValue
        const rowTimestamp = rowValue.getTime()

        if (from && to) {
          return rowTimestamp >= from && rowTimestamp <= to
        } else if (from) {
          return rowTimestamp >= from
        } else if (to) {
          return rowTimestamp <= to
        }
        return true
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label='Open menu' variant='ghost' className='flex size-8 p-0 data-[state=open]:bg-muted'>
              <DotsThreeIcon className='size-4' aria-hidden='true' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-40'>
            <DropdownMenuItem onSelect={() => setRowAction({ row, variant: 'update' })}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setRowAction({ row, variant: 'delete' })}>
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      size: 40,
    },
  ]
}
