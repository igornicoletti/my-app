import { TableSort } from '@/components/table/sort'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useTaskUpdate } from '@/features/app/task/lib/hook'
import { type TaskSchema, labelList, priorityList, statusList } from '@/features/app/task/lib/schema'
import { priorityIcons, statusIcons } from '@/features/app/task/lib/util'
import { dateRangeFilterFn, numberRangeFilterFn } from '@/libs/filter-fn'
import { formatDate } from '@/libs/format'
import type { DataTableRowAction } from '@/types/data-table'
import { ArrowsDownUpIcon, CalendarBlankIcon, CircleDashedIcon, ClockIcon, DotsThreeVerticalIcon, TextAaIcon } from '@phosphor-icons/react'
import type { ColumnDef } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'

interface TaskTableColumnProps {
  estimatedHoursRange: [number, number]
  setRowAction: Dispatch<SetStateAction<DataTableRowAction<TaskSchema> | null>>
}

export const TaskTableColumn = ({
  estimatedHoursRange,
  setRowAction,
}: TaskTableColumnProps): ColumnDef<TaskSchema>[] => [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
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
      accessorKey: 'code',
      header: ({ column }) => <TableSort column={column} title='Task' />,
      cell: ({ row }) => <div className='w-20'>{row.getValue('code')}</div>,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => <TableSort column={column} title='Title' />,
      cell: ({ row }) => (
        <div className='flex items-center gap-2'>
          {row.original.label && <Badge variant='secondary'>{row.original.label}</Badge>}
          <span className='max-w-md truncate'>{row.getValue('title')}</span>
        </div>
      ),
      meta: {
        label: 'Title',
        placeholder: 'Search title...',
        variant: 'text',
        icon: TextAaIcon,
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <TableSort column={column} title='Status' />,
      cell: ({ cell }) => {
        const value = cell.getValue<TaskSchema['status']>()
        const Icon = value ? statusIcons[value] : null
        return value ? (
          <div className='flex items-center gap-2'>
            {Icon && <Icon />}
            {value}
          </div>
        ) : null
      },
      meta: {
        label: 'Status',
        variant: 'multiSelect',
        icon: CircleDashedIcon,
        options: statusList.map((status) => ({
          label: status,
          value: status,
          icon: statusIcons[status]
        })),
      },
      enableColumnFilter: true,
      filterFn: 'arrIncludesSome',
    },
    {
      accessorKey: 'priority',
      header: ({ column }) => <TableSort column={column} title='Priority' />,
      cell: ({ cell }) => {
        const value = cell.getValue<TaskSchema['priority']>()
        const Icon = value ? priorityIcons[value] : null
        return value ? (
          <div className='flex items-center gap-2'>
            {Icon && <Icon />}
            {value}
          </div>
        ) : null
      },
      meta: {
        label: 'Priority',
        variant: 'multiSelect',
        icon: ArrowsDownUpIcon,
        options: priorityList.map((priority) => ({
          label: priority,
          value: priority,
          icon: priorityIcons[priority]
        })),
      },
      enableColumnFilter: true,
      filterFn: 'arrIncludesSome',
    },
    {
      accessorKey: 'estimatedHours',
      header: ({ column }) => <TableSort column={column} title='Est. Hours' />,
      cell: ({ cell }) => <span>{cell.getValue<number>()}h</span>,
      meta: {
        label: 'Est. Hours',
        variant: 'range',
        range: estimatedHoursRange,
        unit: 'h',
        icon: ClockIcon,
      },
      enableColumnFilter: true,
      filterFn: numberRangeFilterFn,
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <TableSort column={column} title='Created At' />,
      cell: ({ cell }) => formatDate(cell.getValue<Date>()),
      meta: {
        label: 'Created At',
        variant: 'dateRange',
        icon: CalendarBlankIcon,
      },
      enableColumnFilter: true,
      filterFn: dateRangeFilterFn,
    },

    {
      id: 'actions',
      size: 40,
      cell: ({ row }) => {
        const updateTaskMutation = useTaskUpdate()
        const task = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size='sm'
                aria-label='Open menu'
                variant='ghost'
                className='data-[state=open]:bg-muted'>
                <DotsThreeVerticalIcon weight='bold' aria-hidden='true' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-48'>
              <DropdownMenuItem onSelect={() => setRowAction({ row, variant: 'view' })}>
                Details
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setRowAction({ row, variant: 'update' })}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={task.label}
                    onValueChange={(value) => updateTaskMutation.mutate({
                      id: task.id,
                      label: value as TaskSchema['label']
                    })}>
                    {labelList.map((label) => (
                      <DropdownMenuRadioItem key={label} value={label} disabled={updateTaskMutation.isPending}>
                        {label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant='destructive' onSelect={() => setRowAction({ row, variant: 'delete' })}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
