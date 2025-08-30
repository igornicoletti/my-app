import { useMemo, useState } from 'react'

import { DataTable, Toolbar } from '@/components/datatable'
import {
  DeleteTask,
  TasksAction,
  TasksColumns,
  TasksToolbar,
  UpdateTask,
  ViewTask
} from '@/features/app/tasks/components'
import { useTasks } from '@/features/app/tasks/hooks/useTasks'
import type { TaskSchema } from '@/features/app/tasks/lib/types'
import { getRangeValues } from '@/features/app/tasks/lib/utils'
import { useDataTable } from '@/hooks'
import type { DataTableRowAction } from '@/types/datatable'

export const TasksTable = () => {
  const { data: tasks } = useTasks()
  const [rowAction, setRowAction] = useState<DataTableRowAction<TaskSchema> | null>(null)

  const estimatedHoursRange: [number, number] = tasks && tasks.length > 0
    ? getRangeValues(tasks, 'estimatedHours')
    : [0, 24]

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
        actionBar={<TasksAction table={table} />}>
        <Toolbar table={table}>
          <TasksToolbar table={table} />
        </Toolbar>
      </DataTable>
      <ViewTask
        open={!!rowAction && rowAction.variant === 'view'}
        onOpenChange={() => setRowAction(null)}
        task={rowAction?.row.original ?? null}
      />
      <UpdateTask
        open={!!rowAction && rowAction.variant === 'update'}
        onOpenChange={() => setRowAction(null)}
        task={rowAction?.row.original ?? null}
      />
      <DeleteTask
        open={!!rowAction && rowAction.variant === 'delete'}
        onOpenChange={() => setRowAction(null)}
        tasks={rowAction?.row.original ? [rowAction?.row.original] : []}
        showTrigger={false}
        onSuccess={() => rowAction?.row.toggleSelected(false)}
      />
    </>
  )
}
