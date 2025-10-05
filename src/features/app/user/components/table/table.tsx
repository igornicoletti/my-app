import { DataTable } from '@/components/table/table'
import { TableToolbar } from '@/components/table/toolbar'
import { UserDelete } from '@/features/app/user/components/delete'
import { UserDetail } from '@/features/app/user/components/detail'
import { UserEntity } from '@/features/app/user/components/entity'
import { UserTableAction } from '@/features/app/user/components/table/action'
import { UserTableColumn } from '@/features/app/user/components/table/column'
import { UserTableToolbar } from '@/features/app/user/components/table/toolbar'
import { useUser } from '@/features/app/user/lib/hook'
import type { UserSchema } from '@/features/app/user/lib/schema'
import { useDataTable } from '@/hooks/use-datatable'
import type { DataTableRowAction } from '@/types/datatable'
import { useMemo, useState } from 'react'

export const UserTable = () => {
  const { data: users } = useUser()
  const [rowAction, setRowAction] = useState<DataTableRowAction<UserSchema> | null>(null)

  const columns = useMemo(() => UserTableColumn({
    setRowAction
  }), [setRowAction])

  const { table } = useDataTable({
    data: users ?? [],
    columns,
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }],
      columnPinning: { right: ['actions'] },
    },
    getRowId: (row) => row.id,
  })

  return (
    <>
      <DataTable table={table} actionBar={<UserTableAction table={table} />}>
        <TableToolbar table={table}>
          <UserTableToolbar table={table} />
        </TableToolbar>
      </DataTable>
      <UserDetail
        open={!!rowAction && rowAction.variant === 'view'}
        onOpenChange={() => setRowAction(null)}
        user={rowAction?.row.original ?? null} />
      <UserEntity
        open={!!rowAction && rowAction.variant === 'update'}
        onOpenChange={() => setRowAction(null)}
        user={rowAction?.row.original ?? null} />
      <UserDelete
        open={!!rowAction && rowAction.variant === 'delete'}
        onOpenChange={() => setRowAction(null)}
        users={rowAction?.row.original ? [rowAction?.row.original] : []}
        onSuccess={() => rowAction?.row.toggleSelected(false)} />
    </>
  )
}
