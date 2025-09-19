import { ActionBar, ActionBarAction, ActionBarSelection } from '@/components/table/action-bar'
import { Select, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useDeleteTasks, useUpdateTasks } from '@/features/app/tasks/lib/hooks'
import { priorityList, statusList, type TaskSchema } from '@/features/app/tasks/lib/schemas'
import { exportTableToCSV } from '@/lib/export'
import { ArrowUpIcon, CircleDashedIcon, DownloadSimpleIcon, TrashSimpleIcon } from '@phosphor-icons/react'
import { SelectTrigger } from '@radix-ui/react-select'
import type { Table } from '@tanstack/react-table'

interface TasksActionBarProps {
  table: Table<TaskSchema>
}

export const TasksActionBar = ({ table }: TasksActionBarProps) => {
  const rows = table.getFilteredSelectedRowModel().rows

  const updateTasksMutation = useUpdateTasks({
    onSuccess: () => table.toggleAllRowsSelected(false)
  })

  const onUpdateStatus = (status: TaskSchema['status']) => {
    updateTasksMutation.mutate({
      ids: rows.map((row) => row.original.id),
      fields: { status },
    })
  }

  const onUpdatePriority = (priority: TaskSchema['priority']) => {
    updateTasksMutation.mutate({
      ids: rows.map((row) => row.original.id),
      fields: { priority },
    })
  }

  const deleteTasksMutation = useDeleteTasks({
    onSuccess: () => table.toggleAllRowsSelected(false)
  })

  const onDelete = () => {
    deleteTasksMutation.mutate(rows.map((row) => row.original.id))
  }

  const onExport = () => {
    exportTableToCSV(table, {
      excludeColumns: ['select', 'actions'],
      onlySelected: true,
    })
  }

  return (
    <ActionBar table={table} visible={rows.length > 0}>
      <ActionBarSelection table={table} />
      <Separator orientation='vertical' className='hidden data-[orientation=vertical]:h-5 sm:block' />
      <div className='flex flex-wrap items-center justify-center gap-1.5'>
        <Select onValueChange={onUpdateStatus}>
          <SelectTrigger asChild>
            <ActionBarAction size='icon' tooltip='Update status'>
              <CircleDashedIcon />
            </ActionBarAction>
          </SelectTrigger>
          <SelectContent align='center'>
            <SelectGroup>
              {statusList.map((status) => (
                <SelectItem key={status} value={status} className='capitalize'>
                  {status}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={onUpdatePriority}>
          <SelectTrigger asChild>
            <ActionBarAction size='icon' tooltip='Update priority'>
              <ArrowUpIcon />
            </ActionBarAction>
          </SelectTrigger>
          <SelectContent align='center'>
            <SelectGroup>
              {priorityList.map((priority) => (
                <SelectItem key={priority} value={priority} className='capitalize'>
                  {priority}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <ActionBarAction size='icon' tooltip='Export tasks' onClick={onExport}>
          <DownloadSimpleIcon />
        </ActionBarAction>
        <ActionBarAction size='icon' tooltip='Delete tasks' onClick={onDelete}>
          <TrashSimpleIcon />
        </ActionBarAction>
      </div>
    </ActionBar>
  )
}
