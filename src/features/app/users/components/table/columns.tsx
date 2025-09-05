import { CalendarBlankIcon, CircleDashedIcon, DotsThreeIcon, ShieldIcon, TextAaIcon } from '@phosphor-icons/react'
import type { ColumnDef } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'

import { ColumnHeader } from '@/components/table/column-header'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { dateRangeFilter } from '@/features/app/users/lib/filters'
import { roles, statuses, type UserSchema } from '@/features/app/users/lib/schemas'
import { getRoleIcon, getStatusIcon } from '@/features/app/users/lib/utils'
import { formatDate } from '@/lib/format'
import type { DataTableRowAction } from '@/types/data-table'

interface UsersColumnsProps {
  setRowAction: Dispatch<SetStateAction<DataTableRowAction<UserSchema> | null>>
}

export const UsersColumns = ({ setRowAction }: UsersColumnsProps): ColumnDef<UserSchema>[] => [
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
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => <ColumnHeader column={column} title='Name' />,
    cell: ({ row }) => <span className='max-w-md truncate'>{row.getValue('name')}</span>,
    meta: {
      label: 'Name',
      placeholder: 'Search names...',
      variant: 'text',
      icon: TextAaIcon,
    },
    enableColumnFilter: true,
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: ({ column }) => <ColumnHeader column={column} title='Email' />,
    cell: ({ row }) => <span className='max-w-md truncate'>{row.getValue('email')}</span>,
    enableColumnFilter: false,
  },
  {
    id: 'phone',
    accessorKey: 'phone',
    header: ({ column }) => <ColumnHeader column={column} title='Phone Number' />,
    cell: ({ row }) => <span className='max-w-md truncate'>{row.getValue('phone')}</span>,
    enableColumnFilter: false,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => <ColumnHeader column={column} title='Status' />,
    cell: ({ cell }) => {
      const status = statuses.find((s) => s === cell.getValue<UserSchema['status']>())
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
    id: 'role',
    accessorKey: 'role',
    header: ({ column }) => <ColumnHeader column={column} title='Role' />,
    cell: ({ cell }) => {
      const role = roles.find((r) => r === cell.getValue<UserSchema['role']>())
      if (!role) return null
      const Icon = getRoleIcon(role)
      return (
        <div className='flex items-center gap-2 [&>svg]:size-3'>
          <Icon />
          {role}
        </div>
      )
    },
    meta: {
      label: 'Role',
      variant: 'multiSelect',
      options: roles.map((role) => ({
        label: role.charAt(0).toUpperCase() + role.slice(1),
        value: role,
        icon: getRoleIcon(role),
      })),
      icon: ShieldIcon,
    },
    enableColumnFilter: true,
    filterFn: 'arrIncludesSome',
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: ({ column }) => <ColumnHeader column={column} title='Registered Date' />,
    cell: ({ cell }) => formatDate(cell.getValue<Date>()),
    meta: {
      label: 'Registered',
      variant: 'dateRange',
      icon: CalendarBlankIcon,
    },
    enableColumnFilter: true,
    filterFn: dateRangeFilter,
  },
  {
    id: 'lastLogin',
    accessorKey: 'lastLogin',
    header: ({ column }) => <ColumnHeader column={column} title='Last Login Date' />,
    cell: ({ cell }) => formatDate(cell.getValue<Date>()),
    meta: {
      label: 'Last Login',
      variant: 'dateRange',
      icon: CalendarBlankIcon,
    },
    enableColumnFilter: true,
    filterFn: dateRangeFilter,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
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
          <DropdownMenuItem onSelect={() => setRowAction({ row, variant: 'view' })}>
            Details
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setRowAction({ row, variant: 'update' })}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant='destructive'
            onSelect={() => setRowAction({ row, variant: 'delete' })}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    size: 40,
  },
]
