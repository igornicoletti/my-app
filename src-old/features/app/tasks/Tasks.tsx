import { DataTable } from '@/components/data-table/data-table'
import { DataTableAdvancedToolbar } from '@/components/data-table/data-table-advanced-toolbar'
import { DataTableFilterMenu } from '@/components/data-table/data-table-filter-menu'
import { getTasksTableColumns } from '@/features/app/tasks/data/tasks.columns'
import type { Task } from '@/features/app/tasks/data/tasks.type'
import { useDataTable } from '@/hooks/use-data-table'
import { useLoaderData } from 'react-router-dom'

type LoaderData = {
  tasks: Task[]
  statusCounts: Record<Task['status'], number>
  priorityCounts: Record<Task['priority'], number>
  estimatedHoursRange: { min: number; max: number }
}

export const Tasks = () => {
  const { tasks, statusCounts, priorityCounts, estimatedHoursRange } = useLoaderData() as LoaderData

  const table = useDataTable({
    data: tasks,
    columns: getTasksTableColumns({
      statusCounts,
      priorityCounts,
      estimatedHoursRange,
      setRowAction: () => { }, // defina conforme sua lógica
    }),
    pageCount: 1, // Altere caso haja paginação real
  })

  return (
    <div className='flex flex-col gap-6'>
      <header className='grid gap-2'>
        <h2 className='text-xl font-bold'>Tasks Table</h2>
        <p className='text-sm text-muted-foreground'>Here's a list of your tasks.</p>
      </header>
      <DataTable table={table}>
        <DataTableAdvancedToolbar table={table}>
          <DataTableFilterMenu table={table} />
        </DataTableAdvancedToolbar>
      </DataTable>
    </div>
  )
}
