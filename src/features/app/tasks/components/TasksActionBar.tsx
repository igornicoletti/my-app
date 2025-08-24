import { ArrowClockwiseIcon, ArrowUpIcon, DownloadSimpleIcon, TrashSimpleIcon } from '@phosphor-icons/react'
import { SelectTrigger } from '@radix-ui/react-select'
import type { Table } from '@tanstack/react-table'
import { startTransition, useCallback } from 'react'
import { useFetcher } from 'react-router-dom'

import { ActionBar, ActionBarAction, ActionBarSelection } from '@/components/datatable'
import { Select, SelectContent, SelectGroup, SelectItem, Separator } from '@/components/ui'
import { taskSchema, type TaskSchema } from '@/features/app/tasks/lib/schema'
import { exportTableToCSV } from '@/lib/export'

interface TasksActionBarProps {
  table: Table<TaskSchema>
}

export const TasksActionBar = ({ table }: TasksActionBarProps) => {
  const rows = table.getFilteredSelectedRowModel().rows
  const fetcher = useFetcher()
  const isPending = fetcher.state !== 'idle'

  const getIsActionPending = (intent: string) => {
    return isPending && fetcher.formData?.get('intent') === intent
  }

  const onTaskUpdate = (
    { field, value }: {
      field: 'status' | 'priority'
      value: TaskSchema['status'] | TaskSchema['priority']
    }
  ) => {
    const formData = new FormData()
    formData.append('intent', 'updateTasks')
    rows.forEach(row => formData.append('ids', row.original.id))
    formData.append(field, value)

    fetcher.submit(formData, { method: 'POST' })
  }


  const onTaskExport = useCallback(() => {
    startTransition(() => {
      exportTableToCSV(table, {
        excludeColumns: ['select', 'actions'],
        onlySelected: true,
      })
    })
  }, [table])

  const onTaskDelete = () => {
    const formData = new FormData()
    formData.append('intent', 'deleteTasks')
    rows.forEach(row => formData.append('ids', row.original.id))

    fetcher.submit(formData, { method: 'POST' })
  }

  return (
    <ActionBar table={table} visible={rows.length > 0}>
      <ActionBarSelection table={table} />
      <Separator
        orientation='vertical'
        className='hidden data-[orientation=vertical]:h-5 sm:block'
      />
      <div className='flex items-center gap-1.5'>
        <Select
          onValueChange={(value: TaskSchema['status']) =>
            onTaskUpdate({ field: 'status', value })
          }>
          <SelectTrigger asChild>
            <ActionBarAction
              size='icon'
              tooltip='Update status'
              isPending={getIsActionPending('updateTasks')}>
              <ArrowClockwiseIcon />
            </ActionBarAction>
          </SelectTrigger>
          <SelectContent align='center'>
            <SelectGroup>
              {taskSchema.shape.status.options.map((status) => (
                <SelectItem key={status} value={status} className='capitalize'>
                  {status}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value: TaskSchema['priority']) =>
            onTaskUpdate({ field: 'priority', value })
          }>
          <SelectTrigger asChild>
            <ActionBarAction
              size='icon'
              tooltip='Update priority'
              isPending={getIsActionPending('updateTasks')}>
              <ArrowUpIcon />
            </ActionBarAction>
          </SelectTrigger>
          <SelectContent align='center'>
            <SelectGroup>
              {taskSchema.shape.priority.options.map((priority) => (
                <SelectItem
                  key={priority}
                  value={priority}
                  className='capitalize'>
                  {priority}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <ActionBarAction
          size='icon'
          tooltip='Export tasks'
          isPending={getIsActionPending('exportTasks')}
          onClick={onTaskExport}>
          <DownloadSimpleIcon />
        </ActionBarAction>
        <ActionBarAction
          size='icon'
          tooltip='Delete tasks'
          isPending={getIsActionPending('deleteTasks')}
          onClick={onTaskDelete}>
          <TrashSimpleIcon />
        </ActionBarAction>
      </div>
    </ActionBar>
  )
}
