import { useEffect, useMemo, useState } from 'react'

import { DataTable, Toolbar } from '@/components/datatable'
import { DeleteTasks, TasksAction, TasksToolbar, UpdateTask } from '@/features/app/tasks/components'
import { TasksColumns } from '@/features/app/tasks/components/TasksColumns'
import { seedTasks, useTasks } from '@/features/app/tasks/lib/actions'
import type { TaskSchema } from '@/features/app/tasks/lib/schema'
import { getRangeValues } from '@/features/app/tasks/lib/utils'
import { useDataTable } from '@/hooks'
import type { DataTableRowAction } from '@/types/datatable'

export const TasksTable = () => {
  const tasks = useTasks()
  const [rowAction, setRowAction] = useState<DataTableRowAction<TaskSchema> | null>(null)
  const estimatedHoursRange: [number, number] = tasks.length === 0 ? [0, 24] : getRangeValues(tasks, 'estimatedHours')

  useEffect(() => {
    if (tasks.length === 0) {
      seedTasks({ count: 50 })
    }
  }, [])

  const columns = useMemo(() => TasksColumns({
    setRowAction,
    estimatedHoursRange,
  }), [setRowAction, estimatedHoursRange])

  const { table } = useDataTable({
    data: tasks,
    columns,
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }],
      columnPinning: { right: ['actions'] },
    },
    getRowId: (row) => row.id,
  })

  return (
    <>
      <DataTable table={table} actionBar={<TasksAction table={table} />}>
        <Toolbar table={table}>
          <TasksToolbar table={table} />
        </Toolbar>
      </DataTable>
      <UpdateTask
        open={rowAction?.variant === 'update'}
        onOpenChange={() => setRowAction(null)}
        task={rowAction?.row.original ?? null}
      />
      <DeleteTasks
        open={rowAction?.variant === 'delete'}
        onOpenChange={() => setRowAction(null)}
        tasks={rowAction?.row.original ? [rowAction?.row.original] : []}
        showTrigger={false}
        onSuccess={() => rowAction?.row.toggleSelected(false)}
      />
    </>
  )
}
