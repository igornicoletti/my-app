import {
  ArrowsDownUpIcon,
  CalendarIcon,
  CircleDashedIcon,
  ClockIcon,
  DotsThreeIcon,
  TextAaIcon
} from '@phosphor-icons/react'
import type { ColumnDef } from '@tanstack/react-table'
import { type Dispatch, type SetStateAction } from 'react'
import { useFetcher } from 'react-router-dom'

import { ColumnHeader } from '@/components/datatable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { taskSchema, type TaskSchema } from '@/features/app/tasks/lib/schema'
import { getPriorityIcon, getStatusIcon } from '@/features/app/tasks/lib/utils'
import { formatDate } from '@/lib/format'
import type { DataTableRowAction } from '@/types/datatable'

interface TasksColumnsProps {
  statusCounts: Record<TaskSchema['status'], number>
  priorityCounts: Record<TaskSchema['priority'], number>
  estimatedHoursRange: [number, number]
  setRowAction: Dispatch<SetStateAction<DataTableRowAction<TaskSchema> | null>>
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const tasksColumns = ({
  statusCounts,
  priorityCounts,
  estimatedHoursRange,
  setRowAction,
}: TasksColumnsProps): ColumnDef<TaskSchema>[] => [
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
      header: ({ column }) => <ColumnHeader column={column} title='Task' />,
      cell: ({ row }) => row.getValue('code'),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'title',
      accessorKey: 'title',
      header: ({ column }) => <ColumnHeader column={column} title='Title' />,
      cell: ({ row }) => {
        const label = taskSchema.shape.label.options.find((label) =>
          label === row.original.label)
        return (
          <div className='flex items-center gap-2'>
            {label && <Badge variant='secondary'>{capitalize(label)}</Badge>}
            <span className='max-w-lg truncate'>{row.getValue('title')}</span>
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
      header: ({ column }) => <ColumnHeader column={column} title='Status' />,
      cell: ({ cell }) => {
        const status = taskSchema.shape.status.options.find((status) =>
          status === cell.getValue<TaskSchema['status']>())
        if (!status) return null
        const Icon = getStatusIcon(status)
        return (
          <div className='flex items-center gap-2'>
            <Icon className='text-muted-foreground' />
            <span className='capitalize'>{capitalize(status)}</span>
          </div>
        )
      },
      meta: {
        label: 'Status',
        variant: 'multiSelect',
        options: taskSchema.shape.status.options.map((status) => ({
          label: capitalize(status),
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
      id: 'priority',
      accessorKey: 'priority',
      header: ({ column }) => <ColumnHeader column={column} title='Priority' />,
      cell: ({ cell }) => {
        const priority = taskSchema.shape.priority.options.find((priority) =>
          priority === cell.getValue<TaskSchema['priority']>())
        if (!priority) return null
        const Icon = getPriorityIcon(priority)
        return (
          <div className='flex items-center gap-2'>
            <Icon className='text-muted-foreground' />
            <span className='capitalize'>{capitalize(priority)}</span>
          </div>
        )
      },
      meta: {
        label: 'Priority',
        variant: 'multiSelect',
        options: taskSchema.shape.priority.options.map((priority) => ({
          label: capitalize(priority),
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
      id: 'estimatedHours',
      accessorKey: 'estimatedHours',
      header: ({ column }) => <ColumnHeader column={column} title='Est. Hours' />,
      cell: ({ cell }) => {
        const estimatedHours = cell.getValue<number>()
        return <div className='w-20 text-right'>{estimatedHours}</div>
      },
      meta: {
        label: 'Est. Hours',
        variant: 'range',
        range: estimatedHoursRange,
        unit: 'hr',
        icon: ClockIcon,
      },
      enableColumnFilter: true,
      filterFn: (row, columnId, value: [number?, number?]) => {
        const rowValue = row.getValue<number>(columnId)
        if (typeof rowValue !== 'number') return false

        const [min, max] = value
        const isMinValid = typeof min === 'number' && !Number.isNaN(min)
        const isMaxValid = typeof max === 'number' && !Number.isNaN(max)

        if (isMinValid && isMaxValid) return rowValue >= min && rowValue <= max
        if (isMinValid) return rowValue >= min
        if (isMaxValid) return rowValue <= max
        return true
      },
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: ({ column }) => <ColumnHeader column={column} title='Created At' />,
      cell: ({ cell }) => formatDate(cell.getValue<Date>()),
      meta: {
        label: 'Created At',
        variant: 'dateRange',
        icon: CalendarIcon,
      },
      enableColumnFilter: true,
      filterFn: (row, columnId, value: [Date?, Date?]) => {
        const rowDate = row.getValue<Date>(columnId)
        if (!rowDate) return false
        const [from, to] = value
        if (from && rowDate < from) return false
        if (to) {
          const endOfDay = new Date(to)
          endOfDay.setHours(23, 59, 59, 999)
          if (rowDate > endOfDay) return false
        }
        return true
      },
    },
    {
      id: 'actions',
      cell: function Cell({ row }) {
        const fetcher = useFetcher()
        const isUpdating = fetcher.state !== 'idle'
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label='Open menu'
                variant='ghost'
                className='flex size-8 p-0 data-[state=open]:bg-muted'>
                <DotsThreeIcon aria-hidden='true' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-40'>
              <DropdownMenuItem onSelect={() => setRowAction({ row, variant: 'update' })}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={row.original.label}
                    onValueChange={(value) => {
                      const formData = new FormData()
                      formData.append('intent', 'updateTask')
                      formData.append('id', row.original.id)
                      formData.append('label', value)
                      fetcher.submit(formData, { method: 'POST' })
                    }}>
                    {taskSchema.shape.label.options.map((label) => (
                      <DropdownMenuRadioItem
                        key={label}
                        value={label}
                        className='capitalize'
                        disabled={isUpdating}>
                        {label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setRowAction({ row, variant: 'delete' })}>
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      size: 40,
    },
  ]
