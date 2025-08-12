// TasksPage.tsx
import { useLoaderData } from 'react-router-dom'

import {
  DataTable,
  Toolbar
} from '@/components/datatable'
import {
  getTasksTableColumns,
  type TaskSchema
} from '@/features/app/tasks/datatable'
import { useDataTable } from '@/hooks/useDataTable'

type LoaderData = {
  tasks: TaskSchema[]
  statusCounts: Record<TaskSchema['status'], number>
  priorityCounts: Record<TaskSchema['priority'], number>
}

export const TasksPage = () => {
  const {
    tasks,
    statusCounts,
    priorityCounts,
  } = useLoaderData() as LoaderData

  const table = useDataTable({
    data: tasks,
    columns: getTasksTableColumns({
      statusCounts,
      priorityCounts,
      setRowAction: (row) => {
        console.log('Row action triggered:', row)
      }
    }),
  })

  return (
    <div className='flex flex-col gap-6'>
      <header className='grid gap-2'>
        <h2 className='text-xl font-bold'>Tasks Table</h2>
        <p className='text-sm text-muted-foreground'>
          Here's a list of your tasks.
        </p>
      </header>

      <DataTable table={table}>
        <Toolbar table={table} />
      </DataTable>
    </div>
  )
}
