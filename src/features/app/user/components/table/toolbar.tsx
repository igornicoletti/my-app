import { Button } from '@/components/ui/button'
import { UserDelete } from '@/features/app/user/components/delete'
import { UserEntity } from '@/features/app/user/components/entity'
import type { UserSchema } from '@/features/app/user/lib/schema'
import { exportTableToCSV } from '@/libs/export'
import { DownloadSimpleIcon, SparkleIcon, TrashSimpleIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'

interface UserTableToolbarProps {
  table: Table<UserSchema>
}

export const UserTableToolbar = ({ table }: UserTableToolbarProps) => {
  const selectedUsers = table.getFilteredSelectedRowModel().rows.map((row) => row.original)

  const onExport = () => {
    exportTableToCSV(table, {
      filename: 'users',
      excludeColumns: ['select', 'actions'],
    })
  }

  return (
    <div className='flex flex-wrap items-center gap-2'>
      <Button variant='secondary' size='sm' onClick={onExport}>
        <DownloadSimpleIcon />
        Export
      </Button>
      {selectedUsers.length > 0 && (
        <UserDelete
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
      <UserEntity
        trigger={
          <Button variant='secondary' size='sm'>
            <SparkleIcon />
            Create
          </Button>
        }
      />
    </div>
  )
}
