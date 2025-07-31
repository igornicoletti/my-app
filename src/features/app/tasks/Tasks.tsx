import { Button } from '@/components'
import { DataTable, ToolbarFilters, ViewOptions } from '@/components/datatable'
import type { TTaskProps } from '@/features/app/tasks'
import { tasksColumns } from '@/features/app/tasks'
import { useDataTable } from '@/hooks'
import { useMemo } from 'react'
import { useLoaderData } from 'react-router-dom'

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
    <DataTable table={table}>
      <ToolbarFilters table={table}>
        <ViewOptions table={table} />
        <Button onClick={() => console.log('Adicionar tarefa')}>
          Add Task
        </Button>
      </ToolbarFilters>
    </DataTable>
  )
}
