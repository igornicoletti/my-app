import { ColumnHeader } from '@/components/table/column-header'
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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useUpdateTask } from '@/features/app/tasks/lib/hooks'
import { type TaskSchema, labelList, priorityList, statusList } from '@/features/app/tasks/lib/schemas'
import { priorityIcons, statusIcons } from '@/features/app/tasks/lib/utils'
import { dateRangeFilterFn, numberRangeFilterFn } from '@/lib/filter-fn'
import { formatDate } from '@/lib/format'
import type { DataTableRowAction } from '@/types/data-table'
import {
  ArrowsDownUpIcon,
  CalendarBlankIcon,
  CircleDashedIcon,
  ClockIcon,
  DotsThreeIcon,
  TextAaIcon,
} from '@phosphor-icons/react'
import type { ColumnDef } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'

interface TasksColumnsProps {
  estimatedHoursRange: [number, number]
  setRowAction: Dispatch<SetStateAction<DataTableRowAction<TaskSchema> | null>>
}

export const TasksColumns = ({
  estimatedHoursRange,
  setRowAction,
}: TasksColumnsProps): ColumnDef<TaskSchema>[] => [
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
      cell: ({ row }) => <div className='w-20'>{row.getValue('code')}</div>,
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: 'title',
      header: ({ column }) => <ColumnHeader column={column} title='Title' />,
      cell: ({ row }) => {
        const label = labelList.find((l) => l === row.original.label)
        return (
          <div className='flex items-center gap-2'>
            {label && <Badge variant='outline'>{label}</Badge>}
            <span className='max-w-md truncate'>{row.getValue('title')}</span>
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
          icon: statusIcons[status],
        })),
      },
      enableColumnFilter: true,
      filterFn: 'arrIncludesSome',
    },

    {
      accessorKey: 'priority',
      header: ({ column }) => <ColumnHeader column={column} title='Priority' />,
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
          icon: priorityIcons[priority],
        })),
      },
      enableColumnFilter: true,
      filterFn: 'arrIncludesSome',
    },

    {
      accessorKey: 'estimatedHours',
      header: ({ column }) => <ColumnHeader column={column} title='Est. Hours' />,
      cell: ({ cell }) => <div>{cell.getValue<number>()}</div>,
      meta: {
        label: 'Est. Hours',
        variant: 'range',
        range: estimatedHoursRange,
        unit: 'hr',
        icon: ClockIcon,
      },
      enableColumnFilter: true,
      filterFn: numberRangeFilterFn,
    },

    {
      accessorKey: 'createdAt',
      header: ({ column }) => <ColumnHeader column={column} title='Created At' />,
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
      cell: function Cell({ row }) {
        const updateTaskMutation = useUpdateTask()
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size='sm'
                aria-label='Open menu'
                variant='ghost'
                className='data-[state=open]:bg-muted'>
                <DotsThreeIcon aria-hidden='true' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-40'>
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
                    value={row.original.label}
                    onValueChange={(value) =>
                      updateTaskMutation.mutate({
                        id: row.original.id,
                        label: value as TaskSchema['label'],
                      })
                    }>
                    {labelList.map((label) => (
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
              <DropdownMenuItem variant='destructive' onSelect={() => setRowAction({ row, variant: 'delete' })}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
