import {
  ClockCountdownIcon,
  ProhibitIcon,
  UserCircleCheckIcon
} from '@phosphor-icons/react'
import type { ColumnDef } from '@tanstack/react-table'

import {
  Badge,
  Checkbox,
  RowActions,
  SortableHeader,
} from '@/components'
import type { UserSchema } from '@/schemas'

const statuses = [
  { label: 'Done', value: 'done', icon: UserCircleCheckIcon },
  { label: 'Blocked', value: 'blocked', icon: ProhibitIcon },
  { label: 'In Progress', value: 'in-progress', icon: ClockCountdownIcon }
]

const roles = [
  { label: 'Admin', value: 'admin' },
  { label: 'Owner', value: 'owner' },
  { label: 'Viewer', value: 'viewer' }
]

export const columns: ColumnDef<UserSchema>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all rows"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const role = roles.find((role) => role.value === row.original.roles)

      return (
        <div className='flex gap-2'>
          {role && <Badge variant='outline'>{role.label}</Badge>}
          <span>{row.getValue('name')}</span>
        </div>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <SortableHeader column={column} title="Email" />,
    cell: ({ row }) => <span>{row.getValue('email')}</span>,
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const data = statuses.find((data) => data.value === row.getValue('status'))
      if (!data) return null
      return (
        <div className='flex items-center gap-2'>
          {data.icon && <data.icon />}
          <span>{data.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      if (!Array.isArray(value)) return false
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <RowActions row={row} />,
  },
]
