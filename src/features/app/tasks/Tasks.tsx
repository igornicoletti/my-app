import { useMemo } from 'react'
import { useLoaderData } from 'react-router-dom'

import { DataTable, ToolbarFilters, ViewOptions } from '@/components/datatable'
import { Button } from '@/components/ui/button'
import { tasksColumns, type TTaskProps } from '@/features/app/tasks'
import { useDataTable } from '@/hooks/ui'

export const Tasks = () => {
  const { tasks } = useLoaderData() as { tasks: TTaskProps[] }

  const statusCounts = useMemo(() => {
    return tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1
      return acc
    }, {} as Record<TTaskProps['status'], number>)
  }, [tasks])

  const priorityCounts = useMemo(() => {
    return tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1
      return acc
    }, {} as Record<TTaskProps['priority'], number>)
  }, [tasks])

  const columns = useMemo(() => tasksColumns({
    statusCounts,
    priorityCounts
  }), [statusCounts, priorityCounts])

  const table = useDataTable({ data: tasks, columns })

  return (
    <div className='flex flex-col gap-6'>
      <header className='grid gap-2'>
        <h2 className='text-xl font-bold'>Tasks Table</h2>
        <p className='text-sm text-muted-foreground'>Here's a list of your tasks.</p>
      </header>
      <DataTable table={table}>
        <ToolbarFilters table={table}>
          <ViewOptions table={table} />
          <Button onClick={() => console.log('Add Task')} variant='secondary'>
            Add Task
          </Button>
        </ToolbarFilters>
      </DataTable>
    </div>
  )
}
