import { ArrowUpIcon, CircleDashedIcon, DownloadSimpleIcon, TrashSimpleIcon } from '@phosphor-icons/react'
import { SelectTrigger } from '@radix-ui/react-select'
import type { Table } from '@tanstack/react-table'

import { ActionBar, ActionBarAction, ActionBarSelection } from '@/components/datatable'
import { Select, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useDeleteTasks, useUpdateTasks } from '@/features/app/tasks/hooks/useTasksMutations'
import { priorities, statuses, type TaskSchema } from '@/features/app/tasks/lib/types'
import { exportTableToCSV } from '@/lib/export'

interface TasksActionBarProps {
  table: Table<TaskSchema>
}

export const TasksAction = ({ table }: TasksActionBarProps) => {
  const rows = table.getFilteredSelectedRowModel().rows

  const updateTasksMutation = useUpdateTasks({
    onSuccess: () => table.toggleAllRowsSelected(false)
  })

  const deleteTasksMutation = useDeleteTasks({
    onSuccess: () => table.toggleAllRowsSelected(false)
  })

  const onTaskExport = () => {
    exportTableToCSV(table, {
      excludeColumns: ['select', 'actions'],
      onlySelected: true,
    })
  }

  const onUpdateStatus = (status: TaskSchema['status']) => {
    updateTasksMutation.mutate({
      ids: rows.map((row) => row.original.id),
      status,
    })
  }

  const onUpdatePriority = (priority: TaskSchema['priority']) => {
    updateTasksMutation.mutate({
      ids: rows.map((row) => row.original.id),
      priority,
    })
  }

  const onDelete = () => {
    deleteTasksMutation.mutate(rows.map((row) => row.original.id))
  }

  return (
    <ActionBar table={table} visible={rows.length > 0}>
      <ActionBarSelection table={table} />
      <Separator orientation='vertical' className='hidden data-[orientation=vertical]:h-5 sm:block' />
      <div className='flex flex-wrap items-center justify-center gap-1.5'>
        <Select onValueChange={onUpdateStatus}>
          <SelectTrigger asChild>
            <ActionBarAction
              size='icon'
              tooltip='Update status'
              disabled={updateTasksMutation.isPending}>
              <CircleDashedIcon />
            </ActionBarAction>
          </SelectTrigger>
          <SelectContent align='center'>
            <SelectGroup>
              {statuses.map((status) => (
                <SelectItem key={status} value={status} className='capitalize'>
                  {status}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={onUpdatePriority}>
          <SelectTrigger asChild>
            <ActionBarAction
              size='icon'
              tooltip='Update priority'
              disabled={updateTasksMutation.isPending}>
              <ArrowUpIcon />
            </ActionBarAction>
          </SelectTrigger>
          <SelectContent align='center'>
            <SelectGroup>
              {priorities.map((priority) => (
                <SelectItem key={priority} value={priority} className='capitalize'>
                  {priority}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <ActionBarAction
          size='icon'
          tooltip='Export tasks'
          disabled={false}
          onClick={onTaskExport}>
          <DownloadSimpleIcon />
        </ActionBarAction>
        <ActionBarAction
          size='icon'
          tooltip='Delete tasks'
          disabled={deleteTasksMutation.isPending}
          onClick={onDelete}>
          <TrashSimpleIcon />
        </ActionBarAction>
      </div>
    </ActionBar>
  )
}
