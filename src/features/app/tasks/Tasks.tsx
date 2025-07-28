import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { useMemo } from 'react'

import { ActionBar, ActionBarAction, ActionBarSelection, DataTable, Toolbar, ViewOptions } from '@/components/table'
import { getTasksTableColumns } from '@/features/app/tasks/data/tasks.columns'
import type { TaskProps } from '@/features/app/tasks/data/tasks.types'
import { TrashSimpleIcon } from '@phosphor-icons/react'

const tasks: TaskProps[] = [
  {
    id: '1',
    code: 'TSK-001',
    title: 'Fix login bug',
    status: 'in-progress',
    priority: 'high',
    label: 'frontend',
    createdAt: '2025-07-25'
  },
  {
    id: '2',
    code: 'TSK-002',
    title: 'Design homepage',
    status: 'todo',
    priority: 'medium',
    label: 'design',
    createdAt: '2025-07-24'
  },
]

export const Tasks = () => {
  const statusCounts = useMemo(() => {
    return tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1
      return acc
    }, {} as Record<TaskProps['status'], number>)
  }, [])

  const priorityCounts = useMemo(() => {
    return tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1
      return acc
    }, {} as Record<TaskProps['priority'], number>)
  }, [])

  const columns = useMemo(() => getTasksTableColumns({
    statusCounts, priorityCounts
  }), [statusCounts, priorityCounts])

  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      pagination: {
        pageIndex: 0,
        pageSize: 10
      }
    }
  })

  return (
    <DataTable table={table} actionBar={
      <ActionBar table={table}>
        <ActionBarSelection table={table} />
        <ActionBarAction onClick={() => console.log('ActionBarAction')} tooltip='Delete selected'>
          <TrashSimpleIcon />
        </ActionBarAction>
      </ActionBar>
    }>
      <Toolbar table={table}>
        <ViewOptions table={table} />
      </Toolbar>
    </DataTable>
  )
}
