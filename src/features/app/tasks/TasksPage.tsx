import { useMemo, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

import { DataTable, SortList, Toolbar } from '@/components/datatable'
import type { TaskLoaderData, TaskSchema } from '@/features/app/tasks/api'
import { DeleteTasksDialog } from '@/features/app/tasks/components'
import { getTasksTableColumns } from '@/features/app/tasks/datatable'
import { useDataTable } from '@/hooks/useDataTable'
import type { DataTableRowAction } from '@/types/datatable'

export const TasksPage = () => {
  const { tasks, statusCounts, priorityCounts } = useLoaderData() as TaskLoaderData
  const [rowAction, setRowAction] = useState<DataTableRowAction<TaskSchema> | null>(null)

  const columns = useMemo(() => getTasksTableColumns({
    statusCounts,
    priorityCounts,
    setRowAction,
  }), [statusCounts, priorityCounts])

  const { table } = useDataTable({
    data: tasks,
    columns,
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ['actions'] },
    },
    getRowId: (originalRow) => originalRow.id,
  })

  return (
    <>
      <div className='flex flex-col gap-6'>
        <header className='grid gap-2'>
          <h2 className='text-xl font-bold'>Tasks Table</h2>
          <p className='text-sm text-muted-foreground'>
            Here's a list of your tasks.
          </p>
        </header>

        <DataTable table={table}>
          <Toolbar table={table}>
            <SortList table={table} align="end" />
          </Toolbar>
        </DataTable>

      </div>
      <DeleteTasksDialog
        open={rowAction?.variant === 'delete'}
        onOpenChange={() => setRowAction(null)}
        tasks={rowAction?.row.original ? [rowAction?.row.original] : []}
        showTrigger={false}
        onSuccess={() => rowAction?.row.toggleSelected(false)}
      />
    </>
  )
}
