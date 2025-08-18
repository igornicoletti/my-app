import { useMemo, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

import { DataTable, Toolbar } from '@/components/datatable'
import type { TaskLoaderData, TaskSchema } from '@/features/app/tasks/api'
import { CreateTasks, DeleteTasks, UpdateTasks } from '@/features/app/tasks/components'
import { getTasksTableColumns } from '@/features/app/tasks/datatable'
import { useDataTable } from '@/hooks/useDataTable'
import type { DataTableRowAction } from '@/types/datatable'

export const TasksPage = () => {
  const { tasks: loaderTasks, statusCounts, priorityCounts, estimatedHoursRange } = useLoaderData() as TaskLoaderData
  const [tasksData, setTasksData] = useState(loaderTasks)
  const [rowAction, setRowAction] = useState<DataTableRowAction<TaskSchema> | null>(null)


  const columns = useMemo(() => getTasksTableColumns({
    statusCounts,
    priorityCounts,
    estimatedHoursRange: estimatedHoursRange || { min: 0, max: 100 },
    setRowAction,
  }), [statusCounts, priorityCounts, estimatedHoursRange, setRowAction])

  const { table } = useDataTable({
    data: tasksData,
    columns,
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }],
      columnPinning: { right: ['actions'] },
    },
    getRowId: (originalRow) => originalRow.id,
  })

  const tasksToDelete = rowAction?.variant === 'delete' ? [rowAction.row.original] : []

  return (
    <>
      <div className='flex flex-col gap-6 px-2'>
        <div className='grid gap-2'>
          <h2 className='text-xl font-bold'>Tasks Table</h2>
          <p className='text-sm text-muted-foreground'>
            Here's a list of your tasks for this month!
          </p>
        </div>
        <DataTable table={table}>
          <Toolbar table={table}>
            <CreateTasks onCreated={(task) => setTasksData(prev => [task, ...prev])} />
          </Toolbar>
        </DataTable>
      </div>

      <UpdateTasks
        open={rowAction?.variant === "update"}
        onOpenChange={() => setRowAction(null)}
        task={rowAction?.row.original ?? null}
        onSuccess={(updatedTask) => {
          setTasksData((prev) => prev.map((task) => task.id === updatedTask.id ? updatedTask : task))
          rowAction?.row.toggleSelected(false)
        }}
      />

      <DeleteTasks
        open={rowAction?.variant === 'delete'}
        onOpenChange={() => setRowAction(null)}
        tasks={tasksToDelete}
        showTrigger={false}
        onSuccess={() => {
          if (tasksToDelete.length > 0) {
            setTasksData((prev) => prev.filter((task) => !tasksToDelete.some((del) => del.id === task.id)))
          }
          rowAction?.row.toggleSelected(false)
        }}
      />
    </>
  )
}
