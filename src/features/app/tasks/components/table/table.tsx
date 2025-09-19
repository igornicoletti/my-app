import { DataTable } from '@/components/table/data-table'
import { Toolbar } from '@/components/table/toolbar'
import { DeleteTasks } from '@/features/app/tasks/components/delete'
import { ViewTask } from '@/features/app/tasks/components/detail'
import { TaskSheet } from '@/features/app/tasks/components/sheet'
import { TasksActionBar } from '@/features/app/tasks/components/table/actionbar'
import { TasksColumns } from '@/features/app/tasks/components/table/columns'
import { TasksToolbar } from '@/features/app/tasks/components/table/toolbar'
import { useTasks } from '@/features/app/tasks/lib/hooks'
import type { TaskSchema } from '@/features/app/tasks/lib/schemas'
import { useDataTable } from '@/hooks/use-data-table'
import { getNumberRange } from '@/lib/filter-fn'
import type { DataTableRowAction } from '@/types/data-table'
import { useMemo, useState } from 'react'

export const TasksTable = () => {
  const { data: tasks } = useTasks()
  const [rowAction, setRowAction] = useState<DataTableRowAction<TaskSchema> | null>(null)

  const estimatedHoursRange: [number, number] = tasks && tasks.length > 0
    ? getNumberRange(tasks, 'estimatedHours')
    : [0, 48]

  const columns = useMemo(() => TasksColumns({
    estimatedHoursRange,
    setRowAction
  }), [estimatedHoursRange, setRowAction])

  const { table } = useDataTable({
    data: tasks ?? [],
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
        actionBar={<TasksActionBar table={table} />}>
        <Toolbar table={table}>
          <TasksToolbar table={table} />
        </Toolbar>
      </DataTable>
      <ViewTask
        open={!!rowAction && rowAction.variant === 'view'}
        onOpenChange={() => setRowAction(null)}
        task={rowAction?.row.original ?? null} />
      <TaskSheet
        open={!!rowAction && rowAction.variant === 'update'}
        onOpenChange={() => setRowAction(null)}
        task={rowAction?.row.original ?? null} />
      <DeleteTasks
        open={!!rowAction && rowAction.variant === 'delete'}
        onOpenChange={() => setRowAction(null)}
        tasks={rowAction?.row.original ? [rowAction?.row.original] : []}
        onConfirm={() => rowAction?.row.toggleSelected(false)} />
    </>
  )
}
