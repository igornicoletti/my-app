import { DownloadSimpleIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { CreateUser } from '@/features/app/users/components/create'
import { DeleteUsers } from '@/features/app/users/components/delete'
import type { UserSchema } from '@/features/app/users/lib/schemas'
import { exportTableToCSV } from '@/lib/export'

interface UsersToolbarActionsProps {
  table: Table<UserSchema>
}

export const UsersToolbar = ({ table }: UsersToolbarActionsProps) => {
  const selectedUsers = table.getFilteredSelectedRowModel().rows.map((row) => row.original)

  const onExport = () => {
    exportTableToCSV(table, {
      filename: 'users',
      excludeColumns: ['select', 'actions'],
    })
  }

  return (
    <div className='flex flex-wrap items-center gap-2'>
      {selectedUsers.length > 0 ? (
        <DeleteUsers
          users={selectedUsers}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
      <Button variant='secondary' size='sm' onClick={onExport}>
        <DownloadSimpleIcon />
        Export
      </Button>
      <CreateUser />
    </div>
  )
}
