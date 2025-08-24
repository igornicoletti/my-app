import { useMemo, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

import { DataTable, Toolbar } from '@/components/datatable'
import { DeleteTasks, TasksActionBar, UpdateTask } from '@/features/app/tasks/components'
import { tasksColumns } from '@/features/app/tasks/lib/columns'
import type { TaskLoaderData } from '@/features/app/tasks/lib/loader'
import type { TaskSchema } from '@/features/app/tasks/lib/schema'
import { useDataTable } from '@/hooks'
import type { DataTableRowAction } from '@/types/datatable'

export const TasksPage = () => {
  const { tasks, statusCounts, priorityCounts, estimatedHoursRange } = useLoaderData() as TaskLoaderData
  const [rowAction, setRowAction] = useState<DataTableRowAction<TaskSchema> | null>(null)

  const columns = useMemo(() => tasksColumns({
    statusCounts,
    priorityCounts,
    estimatedHoursRange,
    setRowAction,
  }), [statusCounts, priorityCounts, estimatedHoursRange])

  const { table } = useDataTable({
    data: tasks,
    columns,
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }],
      columnPinning: { right: ['actions'] },
    },
    getRowId: (originalRow) => originalRow.id,
  })


  return (
    <>
      <div className='flex flex-col gap-6 px-2'>
        <div className='grid gap-2'>
          <h2 className='text-xl font-bold'>Tasks Table</h2>
          <p className='text-sm text-muted-foreground'>
            Here's a list of your tasks for this month!
          </p>
        </div>

        <DataTable
          table={table}
          actionBar={<TasksActionBar table={table} />}>
          <Toolbar table={table}>
            {/* <SortList table={table} /> */}
          </Toolbar>
        </DataTable>
      </div>

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
