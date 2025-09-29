import { DataTable } from '@/components/table/datatable'
import { TableToolbar } from '@/components/table/toolbar'
import { TaskDelete } from '@/features/app/task/components/delete'
import { TaskDetail } from '@/features/app/task/components/detail'
import { TaskEntity } from '@/features/app/task/components/entity'
import { TaskTableAction } from '@/features/app/task/components/table/action'
import { TaskTableColumn } from '@/features/app/task/components/table/column'
import { TaskToolbar } from '@/features/app/task/components/table/toolbar'
import { useTask } from '@/features/app/task/lib/hook'
import type { TaskSchema } from '@/features/app/task/lib/schema'
import { useDataTable } from '@/hooks/use-data-table'
import { getNumberRange } from '@/libs/filter-fn'
import type { DataTableRowAction } from '@/types/data-table'
import { useMemo, useState } from 'react'

export const TaskTable = () => {
  const { data: tasks } = useTask()
  const [rowAction, setRowAction] = useState<DataTableRowAction<TaskSchema> | null>(null)

  const estimatedHoursRange: [number, number] = useMemo(() => (
    tasks && tasks.length > 0
      ? getNumberRange(tasks, 'estimatedHours')
      : [1, 48]
  ), [tasks])

  const columns = useMemo(() => TaskTableColumn({
    estimatedHoursRange,
    setRowAction,
  }), [estimatedHoursRange, setRowAction])

  const { table } = useDataTable({
    data: tasks ?? [],
    columns,
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }],
      columnPinning: { right: ['actions'] },
    },
    getRowId: (row) => row.id,
  })

  return (
    <>
      <DataTable table={table} actionBar={<TaskTableAction table={table} />}>
        <TableToolbar table={table}>
          <TaskToolbar table={table} />
        </TableToolbar>
      </DataTable>
      <TaskDetail
        open={!!rowAction && rowAction.variant === 'view'}
        onOpenChange={() => setRowAction(null)}
        task={rowAction?.row.original ?? null} />
      <TaskEntity
        open={!!rowAction && rowAction.variant === 'update'}
        onOpenChange={() => setRowAction(null)}
        task={rowAction?.row.original ?? null} />
      <TaskDelete
        open={!!rowAction && rowAction.variant === 'delete'}
        onOpenChange={() => setRowAction(null)}
        tasks={rowAction?.row.original ? [rowAction?.row.original] : []}
        onConfirm={() => rowAction?.row.toggleSelected(false)} />
    </>
  )
}
