import { ArrowsDownUpIcon, CalendarIcon, CircleDashedIcon, ClockIcon, DotsThreeIcon, TextAaIcon, } from '@phosphor-icons/react'
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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useUpdateTask } from '@/features/app/tasks/hooks/useTasksMutations'
import { labels, priorities, statuses, type TaskSchema } from '@/features/app/tasks/lib/types'
import { getPriorityIcon, getStatusIcon } from '@/features/app/tasks/lib/utils'
import { formatDate } from '@/lib/format'
import type { DataTableRowAction } from '@/types/datatable'

interface TasksColumnsProps {
  estimatedHoursRange: [number, number]
  setRowAction: Dispatch<SetStateAction<DataTableRowAction<TaskSchema> | null>>
}

export const TasksColumns = ({
  estimatedHoursRange,
  setRowAction,
}: TasksColumnsProps): ColumnDef<TaskSchema>[] => {
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
        const label = labels.find((label) => label === row.original.label)
        return (
          <div className='flex items-center gap-2'>
            {label && <Badge variant='secondary'>{label}</Badge>}
            <span className='max-w-md truncate'>
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
      header: ({ column }) => <ColumnHeader column={column} title='Status' />,
      cell: ({ cell }) => {
        const status = statuses.find((status) => status === cell.getValue<TaskSchema['status']>())
        if (!status) return null
        const Icon = getStatusIcon(status)
        return (
          <div className='flex items-center gap-2 [&>svg]:size-3'>
            <Icon />
            {status}
          </div>
        )
      },
      meta: {
        label: 'Status',
        variant: 'multiSelect',
        options: statuses.map((status) => ({
          label: status.charAt(0).toUpperCase() + status.slice(1),
          value: status,
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
      header: ({ column }) => (
        <ColumnHeader column={column} title='Priority' />
      ),
      cell: ({ cell }) => {
        const priority = priorities.find((priority) => priority === cell.getValue<TaskSchema['priority']>())
        if (!priority) return null
        const Icon = getPriorityIcon(priority)
        return (
          <div className='flex items-center gap-2 [&>svg]:size-3'>
            <Icon />
            {priority}
          </div>
        )
      },
      meta: {
        label: 'Priority',
        variant: 'multiSelect',
        options: priorities.map((priority) => ({
          label: priority.charAt(0).toUpperCase() + priority.slice(1),
          value: priority,
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
      header: ({ column }) => (
        <ColumnHeader column={column} title='Est. Hours' />
      ),
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
      filterFn: (
        row,
        columnId,
        range: [number | undefined, number | undefined],
      ) => {
        const val = row.getValue<number>(columnId)
        const [min, max] = range
        if (typeof val !== 'number') return false
        if (min != null && val < min) return false
        if (max != null && val > max) return false
        return true
      },
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
        const updateTaskMutation = useUpdateTask()
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
                      updateTaskMutation.mutate({
                        id: row.original.id,
                        label: value as TaskSchema['label'],
                      })
                    }}>
                    {labels.map((label) => (
                      <DropdownMenuRadioItem
                        key={label}
                        value={label}
                        disabled={updateTaskMutation.isPending}>
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
}
