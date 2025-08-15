import {
  ArrowsDownUpIcon,
  CalendarIcon,
  CircleDashedIcon,
  CopySimpleIcon,
  DotsThreeIcon,
  PencilSimpleIcon,
  TextAaIcon,
  TrashSimpleIcon
} from '@phosphor-icons/react'
import type { ColumnDef } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'

import { ColumnHeader } from '@/components/datatable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  type TaskLoaderData,
  type TaskSchema, taskSchema
} from '@/features/app/tasks/api'
import { getPriorityIcon, getStatusIcon } from '@/features/app/tasks/datatable'
import { formatDate } from '@/lib/format'
import type { DataTableRowAction } from '@/types/datatable'

interface GetTasksTableColumnsProps extends Pick<TaskLoaderData, 'statusCounts' | 'priorityCounts'> {
  setRowAction: Dispatch<SetStateAction<DataTableRowAction<TaskSchema> | null>>
}

const statusValues = taskSchema.shape.status.options
const priorityValues = taskSchema.shape.priority.options

export const getTasksTableColumns = ({
  statusCounts,
  priorityCounts,
  setRowAction,
}: GetTasksTableColumnsProps): ColumnDef<TaskSchema>[] => [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
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
      accessorKey: 'code',
      header: ({ column }) => <ColumnHeader column={column} title='Task' />,
      cell: ({ row }) => row.getValue('code'),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => <ColumnHeader column={column} title='Title' />,
      cell: ({ row }) => {
        const label = row.original.label
        return (
          <div className='flex items-center gap-2'>
            {label && <Badge variant='outline'>{label}</Badge>}
            <span className='max-w-lg truncate font-medium'>{row.getValue('title')}</span>
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
      accessorKey: 'status',
      header: ({ column }) => <ColumnHeader column={column} title='Status' />,
      cell: ({ cell }) => {
        const status = cell.getValue<TaskSchema['status']>()
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
        options: statusValues.map((status) => ({
          label: status.charAt(0).toUpperCase() + status.slice(1),
          value: status,
          count: statusCounts[status],
          icon: getStatusIcon(status),
        })),
        icon: CircleDashedIcon,
      },
      enableColumnFilter: true,
      filterFn: 'arrIncludesSome',
    },
    {
      accessorKey: 'priority',
      header: ({ column }) => <ColumnHeader column={column} title='Priority' />,
      cell: ({ cell }) => {
        const priority = cell.getValue<TaskSchema['priority']>()
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
        options: priorityValues.map((priority) => ({
          label: priority.charAt(0).toUpperCase() + priority.slice(1),
          value: priority,
          count: priorityCounts[priority],
          icon: getPriorityIcon(priority),
        })),
        icon: ArrowsDownUpIcon,
      },
      enableColumnFilter: true,
      filterFn: 'arrIncludesSome',
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <ColumnHeader column={column} title='Created At' />,
      cell: ({ cell }) => formatDate(cell.getValue<Date>()),
      meta: {
        label: 'Created At',
        variant: 'dateRange',
        icon: CalendarIcon,
      },
      enableColumnFilter: true,
      filterFn: (row, columnId, value: [number?, number?]) => {
        const rowDate = row.getValue<Date>(columnId)?.getTime()
        if (!rowDate) return false

        const [from, to] = value
        if (from && rowDate < from) return false
        if (to) {
          const toDate = new Date(to)
          toDate.setHours(23, 59, 59, 999)
          if (rowDate > toDate.getTime()) return false
        }

        return true
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label='Open menu' variant='ghost' size='icon' className='h-8 w-8 flex data-[state=open]:bg-muted'>
              <DotsThreeIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-48' align='end'>
            <DropdownMenuItem>
              <CopySimpleIcon className='mr-2' /> Copy
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setRowAction({ row, variant: 'update' })}>
              <PencilSimpleIcon className='mr-2' /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant='destructive' onSelect={() => setRowAction({ row, variant: 'delete' })}>
              <TrashSimpleIcon className='mr-2' /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      size: 40,
      enableHiding: false,
    },
  ]
