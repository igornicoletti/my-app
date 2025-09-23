import { DataTable } from '@/components/table/data-table'
import { Toolbar } from '@/components/table/toolbar'
import { DeleteTasks } from '@/features/app/task/components/delete'
import { ViewTask } from '@/features/app/task/components/detail'
import { TaskEntity } from '@/features/app/task/components/entity'
import { TasksActionBar } from '@/features/app/task/components/table/actionbar'
import { createTasksColumns } from '@/features/app/task/components/table/columns'
import { TasksToolbar } from '@/features/app/task/components/table/toolbar'
import { useTasks } from '@/features/app/task/lib/hooks'
import type { TaskSchema } from '@/features/app/task/lib/schemas'
import { useDataTable } from '@/hooks/use-data-table'
import { getNumberRange } from '@/libs/filter-fn'
import type { DataTableRowAction } from '@/types/data-table'
import { useMemo, useState } from 'react'

const TaskActionsHandler = ({
  action,
  onClear,
}: {
  action: DataTableRowAction<TaskSchema> | null
  onClear: () => void
}) => {
  if (!action) return null
  const task = action.row.original

  return (
    <>
      <ViewTask open={action.variant === 'view'} onOpenChange={onClear} task={task} />
      <TaskEntity open={action.variant === 'update'} onOpenChange={onClear} task={task} />
      <DeleteTasks
        open={action.variant === 'delete'}
        onOpenChange={onClear}
        tasks={task ? [task] : []}
        onConfirm={() => action.row.toggleSelected(false)}
      />
    </>
  )
}

export const TasksTable = () => {
  const { data: tasks } = useTasks()
  const [rowAction, setRowAction] = useState<DataTableRowAction<TaskSchema> | null>(null)

  const estimatedHoursRange: [number, number] = useMemo(() => (
    tasks && tasks.length > 0
      ? getNumberRange(tasks, 'estimatedHours')
      : [0, 48]
  ), [tasks])

  const columns = useMemo(() => createTasksColumns({
    estimatedHoursRange,
    setRowAction
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
      <DataTable table={table} actionBar={<TasksActionBar table={table} />}>
        <Toolbar table={table}>
          <TasksToolbar table={table} />
        </Toolbar>
      </DataTable>
      <TaskActionsHandler action={rowAction} onClear={() => setRowAction(null)} />
    </>
  )
}
