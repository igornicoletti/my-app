import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
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
    <div className='flex items-center gap-2'>
      <Button variant='outline' size='sm' onClick={onExport}>
        <DownloadSimpleIcon />
        Export
      </Button>
      {selectedUsers.length > 0 && (
        <UserDelete
          users={selectedUsers}
          onSuccess={() => table.toggleAllRowsSelected(false)}
          trigger={
            <Button variant='outline' size='sm'>
              <TrashSimpleIcon />
              <span>Delete</span>
              <Separator orientation='vertical' className='mx-0.5 data-[orientation=vertical]:h-4' />
              <Badge variant='secondary' className='rounded-sm px-1 font-normal'>
                {selectedUsers.length}
              </Badge>
            </Button>
          } />
      )}
      <UserEntity trigger={
        <Button variant='default' size='sm'>
          <SparkleIcon />
          Add User
        </Button>
      }
      />
    </div>
  )
}
