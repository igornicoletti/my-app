import type { ColumnDef } from '@tanstack/react-table'

import {
  ActionMenu,
  Badge,
  Checkbox,
  SortList,
} from '@/components'
import { userRoles, userStatuses, type UserSchema } from '@/features/app/user/data'

const getRoleLabel = (value: string) => {
  const role = userRoles.find((r) => r.value === value)
  return role ? <Badge variant='outline'>{role.label}</Badge> : null
}

const getStatusComponent = (value: string) => {
  const status = userStatuses.find((s) => s.value === value)
  if (!status) return null
  return (
    <div className='flex items-center gap-2'>
      {status.icon && <status.icon />}
      <span>{status.label}</span>
    </div>
  )
}

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
    header: ({ column }) => <SortList column={column} title="Name" />,
    cell: ({ row }) => (
      <div className='flex gap-2'>
        {getRoleLabel(row.original.roles)}
        <span>{row.getValue('name')}</span>
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <SortList column={column} title="Email" />,
    cell: ({ row }) => <span>{row.getValue('email')}</span>,
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortList column={column} title="Status" />,
    cell: ({ row }) => getStatusComponent(row.getValue('status')),
    filterFn: (row, id, value) => Array.isArray(value) && value.includes(row.getValue(id)),
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionMenu row={row} />,
  },
]
