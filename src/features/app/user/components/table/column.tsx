import { TableSort } from '@/components/table/sort'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { roleList, statusList, type UserSchema } from '@/features/app/user/lib/schema'
import { roleIcons, statusIcons } from '@/features/app/user/lib/util'
import { dateRangeFilterFn } from '@/libs/filter-fn'
import { formatDate } from '@/libs/format'
import type { DataTableRowAction } from '@/types/data-table'
import { CalendarBlankIcon, CircleDashedIcon, DotsThreeIcon, ShieldIcon, TextAaIcon } from '@phosphor-icons/react'
import type { ColumnDef, Row } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'

interface UserTableColumnProps {
  setRowAction: Dispatch<SetStateAction<DataTableRowAction<UserSchema> | null>>
}

const UserRowActions = ({ row, setRowAction }: { row: Row<UserSchema>, setRowAction: Dispatch<SetStateAction<DataTableRowAction<UserSchema> | null>> }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size='sm'
          aria-label='Open menu'
          variant='ghost'
          className='data-[state=open]:bg-muted'>
          <DotsThreeIcon weight='bold' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-40'>
        <DropdownMenuItem onSelect={() => setRowAction({ row, variant: 'view' })}>
          Details
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setRowAction({ row, variant: 'update' })}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant='destructive' onSelect={() => setRowAction({ row, variant: 'delete' })}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const UserTableColumn = ({ setRowAction }: UserTableColumnProps): ColumnDef<UserSchema>[] => [
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
    size: 40,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <TableSort column={column} title='Name' />,
    cell: ({ row }) => <div className='max-w-md truncate'>{row.getValue('name')}</div>,
    meta: { label: 'Name', placeholder: 'Search names...', variant: 'text', icon: TextAaIcon }, enableHiding: false,
    enableColumnFilter: true,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <TableSort column={column} title='Email' />,
    cell: ({ row }) => <div className='max-w-md truncate'>{row.getValue('email')}</div>,
    enableColumnFilter: false,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => <TableSort column={column} title='Phone Number' />,
    cell: ({ row }) => row.getValue('phone'),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <TableSort column={column} title='Status' />,
    cell: ({ cell }) => {
      const value = cell.getValue<UserSchema['status']>()
      const Icon = value ? statusIcons[value] : null
      return value ? <div className='flex items-center gap-2'>{Icon && <Icon />}{value}</div> : null
    },
    meta: {
      label: 'Status',
      variant: 'multiSelect',
      icon: CircleDashedIcon,
      options: statusList.map((status) => ({ label: status, value: status, icon: statusIcons[status] })),
    },
    enableColumnFilter: true,
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <TableSort column={column} title='Role' />,
    cell: ({ cell }) => {
      const value = cell.getValue<UserSchema['role']>()
      const Icon = value ? roleIcons[value] : null
      return value ? <div className='flex items-center gap-2'>{Icon && <Icon />}{value}</div> : null
    },
    meta: {
      label: 'Role',
      variant: 'multiSelect',
      icon: ShieldIcon,
      options: roleList.map((role) => ({ label: role, value: role, icon: roleIcons[role], }))
    },
    enableColumnFilter: true,
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <TableSort column={column} title='Registered Date' />,
    cell: ({ cell }) => <span>{formatDate(cell.getValue<Date>())}</span>,
    meta: { label: 'Registered', variant: 'dateRange', icon: CalendarBlankIcon },
    enableColumnFilter: true,
    filterFn: dateRangeFilterFn,
  },
  {
    accessorKey: 'lastLogin',
    header: ({ column }) => <TableSort column={column} title='Last Login Date' />,
    cell: ({ cell }) => <span>{formatDate(cell.getValue<Date>())}</span>,
    meta: { label: 'Last Login', variant: 'dateRange', icon: CalendarBlankIcon },
    enableColumnFilter: true,
    filterFn: dateRangeFilterFn,
  },
  {
    id: 'actions',
    size: 40,
    cell: ({ row }) => <UserRowActions row={row} setRowAction={setRowAction} />,
  },
]
