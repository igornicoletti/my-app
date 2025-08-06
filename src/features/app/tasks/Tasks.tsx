import { useMemo, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

import { DataTable, ToolbarFilters, ViewOptions } from '@/components/datatable'
import { Button } from '@/components/ui/button'
import { tasksColumns, type TTaskProps } from '@/features/app/tasks'
import { useDataTable } from '@/hooks/ui'

export const Tasks = () => {
  const { tasks: initialTasks } = useLoaderData() as { tasks: TTaskProps[] }
  const [data, setData] = useState<TTaskProps[]>(initialTasks)

  const deleteTask = (taskId: string) => {
    setData((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    data.forEach((task) => {
      counts[task.status] = (counts[task.status] ?? 0) + 1
    })
    return counts
  }, [data])

  const priorityCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    data.forEach((task) => {
      counts[task.priority] = (counts[task.priority] ?? 0) + 1
    })
    return counts
  }, [data])

  const columns = useMemo(() => tasksColumns({
    statusCounts,
    priorityCounts,
    onDeleteTask: deleteTask,
  }), [statusCounts, priorityCounts])

  const table = useDataTable({ data, columns })

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
