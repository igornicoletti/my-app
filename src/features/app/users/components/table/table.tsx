import { DataTable } from '@/components/table/data-table'
import { Toolbar } from '@/components/table/toolbar'
import { DeleteUsers } from '@/features/app/users/components/delete'
import { ViewUser } from '@/features/app/users/components/detail'
import { UserSheet } from '@/features/app/users/components/sheet'
import { UsersActionBar } from '@/features/app/users/components/table/actionbar'
import { UsersColumns } from '@/features/app/users/components/table/columns'
import { UsersToolbar } from '@/features/app/users/components/table/toolbar'
import { useUsers } from '@/features/app/users/lib/hooks'
import type { UserSchema } from '@/features/app/users/lib/schemas'
import { useDataTable } from '@/hooks/use-data-table'
import type { DataTableRowAction } from '@/types/data-table'
import { useMemo, useState } from 'react'

export const UsersTable = () => {
  const { data: users } = useUsers()
  const [rowAction, setRowAction] = useState<DataTableRowAction<UserSchema> | null>(null)

  const columns = useMemo(() => UsersColumns({
    setRowAction
  }), [setRowAction])

  const { table } = useDataTable({
    data: users ?? [],
    columns,
    initialState: {
      sorting: [{
        id: 'createdAt',
        desc: true
      }],
      columnPinning: {
        right: ['actions']
      },
    },
    getRowId: (row) => row.id,
  })

  return (
    <>
      <DataTable
        table={table}
        actionBar={<UsersActionBar table={table} />}>
        <Toolbar table={table}>
          <UsersToolbar table={table} />
        </Toolbar>
      </DataTable>
      <ViewUser
        open={!!rowAction && rowAction.variant === 'view'}
        onOpenChange={() => setRowAction(null)}
        user={rowAction?.row.original ?? null} />
      <UserSheet
        open={!!rowAction && rowAction.variant === 'update'}
        onOpenChange={() => setRowAction(null)}
        user={rowAction?.row.original ?? null} />
      <DeleteUsers
        open={!!rowAction && rowAction.variant === 'delete'}
        onOpenChange={() => setRowAction(null)}
        users={rowAction?.row.original ? [rowAction?.row.original] : []}
        onConfirm={() => rowAction?.row.toggleSelected(false)} />
    </>
  )
}
