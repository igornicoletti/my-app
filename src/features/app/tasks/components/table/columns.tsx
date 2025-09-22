import { ColumnHeader } from '@/components/table/column-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useUpdateTask } from '@/features/app/tasks/lib/hooks'
import { type TaskSchema, labelList, priorityList, statusList } from '@/features/app/tasks/lib/schemas'
import { priorityIcons, statusIcons } from '@/features/app/tasks/lib/utils'
import { dateRangeFilterFn, numberRangeFilterFn } from '@/libs/filter-fn'
import { formatDate } from '@/libs/format'
import type { DataTableRowAction } from '@/types/data-table'
import { ArrowsDownUpIcon, CalendarBlankIcon, CircleDashedIcon, ClockIcon, DotsThreeIcon, TextAaIcon } from '@phosphor-icons/react'
import type { ColumnDef, Row } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'

interface TasksColumnsProps {
  estimatedHoursRange: [number, number]
  setRowAction: Dispatch<SetStateAction<DataTableRowAction<TaskSchema> | null>>
}

const TaskRowActions = ({
  row,
  setRowAction,
}: {
  row: Row<TaskSchema>
  setRowAction: TasksColumnsProps['setRowAction']
}) => {
  const updateTaskMutation = useUpdateTask()
  const task = row.original

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' aria-label='Open menu' variant='ghost' className='size-8 data-[state=open]:bg-muted'>
          <DotsThreeIcon aria-hidden='true' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-40'>
        <DropdownMenuItem onSelect={() => setRowAction({ row, variant: 'view' })}>Details</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setRowAction({ row, variant: 'update' })}>Edit</DropdownMenuItem>
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
}

export const createTasksColumns = ({
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
      header: ({ column }) => <ColumnHeader column={column} title='Task' />,
      cell: ({ row }) => <div className='w-20 font-mono'>{row.getValue('code')}</div>,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => <ColumnHeader column={column} title='Title' />,
      cell: ({ row }) => (
        <div className='flex items-center gap-2'>
          {row.original.label && <Badge variant='outline'>{row.original.label}</Badge>}
          <span className='max-w-md truncate'>{row.getValue('title')}</span>
        </div>
      ),
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
      cell: ({ row }) => {
        const status = statusList.find((s) => s === row.getValue('status'))
        if (!status) return null
        const Icon = statusIcons[status]
        return (
          <div className='flex items-center gap-2'>
            <Icon className='text-muted-foreground' />
            <span>{status}</span>
          </div>
        )
      },
      meta: {
        label: 'Status',
        variant: 'multiSelect',
        icon: CircleDashedIcon,
        options: statusList.map((s) => ({ label: s, value: s, icon: statusIcons[s] })),
      },
      enableColumnFilter: true,
      filterFn: 'arrIncludesSome',
    },
    {
      accessorKey: 'priority',
      header: ({ column }) => <ColumnHeader column={column} title='Priority' />,
      cell: ({ row }) => {
        const priority = priorityList.find((p) => p === row.getValue('priority'))
        if (!priority) return null
        const Icon = priorityIcons[priority]
        return (
          <div className='flex items-center gap-2'>
            <Icon className='text-muted-foreground' />
            <span>{priority}</span>
          </div>
        )
      },
      meta: {
        label: 'Priority',
        variant: 'multiSelect',
        icon: ArrowsDownUpIcon,
        options: priorityList.map((p) => ({ label: p, value: p, icon: priorityIcons[p] })),
      },
      enableColumnFilter: true,
      filterFn: 'arrIncludesSome',
    },
    {
      accessorKey: 'estimatedHours',
      header: ({ column }) => <ColumnHeader column={column} title='Est. Hours' />,
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
      cell: ({ row }) => <TaskRowActions row={row} setRowAction={setRowAction} />,
      enableHiding: false,
      size: 40,
    },
  ]
