import { ArrowUpIcon, CircleDashedIcon, DownloadSimpleIcon, TrashSimpleIcon } from '@phosphor-icons/react'
import { SelectTrigger } from '@radix-ui/react-select'
import type { Table } from '@tanstack/react-table'

import { ActionBar, ActionBarAction, ActionBarSelection } from '@/components/table/action-bar'
import { Select, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useDeleteUsers, useUpdateUsers } from '@/features/app/users/hooks/use-users-mutations'
import { roles, statuses, type UserSchema } from '@/features/app/users/lib/schemas'
import { exportTableToCSV } from '@/lib/export'

interface UsersActionBarProps {
  table: Table<UserSchema>
}

export const UsersActionBar = ({ table }: UsersActionBarProps) => {
  const rows = table.getFilteredSelectedRowModel().rows

  const updateUsersMutation = useUpdateUsers({
    onSuccess: () => table.toggleAllRowsSelected(false)
  })

  const onUpdateStatus = (status: UserSchema['status']) => {
    updateUsersMutation.mutate({
      ids: rows.map((row) => row.original.id),
      status,
    })
  }

  const onUpdatePriority = (role: UserSchema['role']) => {
    updateUsersMutation.mutate({
      ids: rows.map((row) => row.original.id),
      role,
    })
  }

  const deleteUsersMutation = useDeleteUsers({
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
    <ActionBar table={table} visible={rows.length > 0}>
      <ActionBarSelection table={table} />
      <Separator orientation='vertical' className='hidden data-[orientation=vertical]:h-5 sm:block' />
      <div className='flex flex-wrap items-center justify-center gap-1.5'>
        <Select onValueChange={onUpdateStatus}>
          <SelectTrigger asChild>
            <ActionBarAction
              size='icon'
              tooltip='Update status'
              disabled={updateUsersMutation.isPending}>
              <CircleDashedIcon />
            </ActionBarAction>
          </SelectTrigger>
          <SelectContent align='center'>
            <SelectGroup>
              {statuses.map((status) => (
                <SelectItem key={status} value={status} className='capitalize'>
                  {status}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={onUpdatePriority}>
          <SelectTrigger asChild>
            <ActionBarAction
              size='icon'
              tooltip='Update role'
              disabled={updateUsersMutation.isPending}>
              <ArrowUpIcon />
            </ActionBarAction>
          </SelectTrigger>
          <SelectContent align='center'>
            <SelectGroup>
              {roles.map((role) => (
                <SelectItem key={role} value={role} className='capitalize'>
                  {role}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <ActionBarAction
          size='icon'
          tooltip='Export users'
          disabled={false}
          onClick={onExport}>
          <DownloadSimpleIcon />
        </ActionBarAction>
        <ActionBarAction
          size='icon'
          tooltip='Delete users'
          disabled={deleteUsersMutation.isPending}
          onClick={onDelete}>
          <TrashSimpleIcon />
        </ActionBarAction>
      </div>
    </ActionBar>
  )
}
