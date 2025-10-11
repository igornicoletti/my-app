import { TableAction, TableActionButton, TableActionSelection } from '@/components/table/action'
import { Select, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { UserDelete } from '@/features/app/user/components/delete'
import { useUserUpdates } from '@/features/app/user/lib/hook'
import { roleList, statusList, type UserSchema } from '@/features/app/user/lib/schema'
import { exportTableToCSV } from '@/libs/export'
import { ArrowUpIcon, CircleDashedIcon, DownloadSimpleIcon, TrashSimpleIcon } from '@phosphor-icons/react'
import { SelectTrigger } from '@radix-ui/react-select'
import type { Table } from '@tanstack/react-table'

interface UserTableActionProps {
  table: Table<UserSchema>
}

export const UserTableAction = ({ table }: UserTableActionProps) => {
  const rows = table.getFilteredSelectedRowModel().rows

  const updateUsersMutation = useUserUpdates({
    onSuccess: () => table.toggleAllRowsSelected(false)
  })

  const onUpdateStatus = (status: UserSchema['status']) => {
    updateUsersMutation.mutate({
      ids: rows.map((row) => row.original.id),
      fields: { status },
    })
  }

  const onUpdateRole = (role: UserSchema['role']) => {
    updateUsersMutation.mutate({
      ids: rows.map((row) => row.original.id),
      fields: { role },
    })
  }

  const onExport = () => {
    exportTableToCSV(table, {
      excludeColumns: ['select', 'actions'],
      onlySelected: true,
    })
  }

  return (
    <TableAction table={table}>
      <TableActionSelection table={table} />
      <Separator orientation='vertical' className='hidden data-[orientation=vertical]:h-5 sm:block' />
      <div className='flex flex-wrap items-center justify-center gap-1.5'>
        <Select onValueChange={onUpdateStatus}>
          <SelectTrigger asChild>
            <TableActionButton size='icon' tooltip='Update Status'>
              <CircleDashedIcon />
            </TableActionButton>
          </SelectTrigger>
          <SelectContent align='center'>
            <SelectGroup>
              {statusList.map((status) => (
                <SelectItem key={status} value={status} className='capitalize'>
                  {status}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={onUpdateRole}>
          <SelectTrigger asChild>
            <TableActionButton size='icon' tooltip='Update Role'>
              <ArrowUpIcon />
            </TableActionButton>
          </SelectTrigger>
          <SelectContent align='center'>
            <SelectGroup>
              {roleList.map((role) => (
                <SelectItem key={role} value={role} className='capitalize'>
                  {role}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <TableActionButton size='icon' tooltip='Export Users' onClick={onExport}>
          <DownloadSimpleIcon />
        </TableActionButton>
        <UserDelete
          users={rows.map(r => r.original)}
          onSuccess={() => table.toggleAllPageRowsSelected(false)}
          trigger={
            <TableActionButton size='icon' tooltip='Delete Users'>
              <TrashSimpleIcon />
            </TableActionButton>
          } />
      </div>
    </TableAction>
  )
}
