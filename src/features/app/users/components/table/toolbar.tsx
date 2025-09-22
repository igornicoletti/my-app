import { Button } from '@/components/ui/button'
import { DeleteUsers } from '@/features/app/users/components/delete'
import { UserSheet } from '@/features/app/users/components/sheet'
import type { UserSchema } from '@/features/app/users/lib/schemas'
import { exportTableToCSV } from '@/libs/export'
import { DownloadSimpleIcon, SparkleIcon, TrashSimpleIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'

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
      <Button variant='outline' size='sm' onClick={onExport}>
        <DownloadSimpleIcon />
        Export
      </Button>
      {selectedUsers.length > 0 && (
        <DeleteUsers
          users={selectedUsers}
          onConfirm={() => table.toggleAllRowsSelected(false)}
          trigger={
            <Button variant='secondary' size='sm'>
              <TrashSimpleIcon />
              Delete
            </Button>
          }
        />
      )}
      <UserSheet
        trigger={
          <Button variant='default' size='sm'>
            <SparkleIcon />
            Create
          </Button>
        }
      />
    </div>
  )
}
