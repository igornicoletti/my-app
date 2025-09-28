import { TableAction, TableActionButton, TableActionSelection } from '@/components/table/action'
import { Select, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useUserDelete, useUserUpdates } from '@/features/app/user/lib/hook'
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

  const deleteUsersMutation = useUserDelete({
    onSuccess: () => table.toggleAllRowsSelected(false)
  })

  const onDelete = () => {
    deleteUsersMutation.mutate(rows.map((row) => row.original.id))
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
            <TableActionButton size='icon' tooltip='Update status'>
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
            <TableActionButton size='icon' tooltip='Update role'>
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
        <TableActionButton size='icon' tooltip='Export users' onClick={onExport}>
          <DownloadSimpleIcon />
        </TableActionButton>
        <TableActionButton size='icon' tooltip='Delete users' onClick={onDelete}>
          <TrashSimpleIcon />
        </TableActionButton>
      </div>
    </TableAction>
  )
}
