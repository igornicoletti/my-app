import { TableAction, TableActionButton, TableActionSelection } from '@/components/table/action'
import { Select, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useTaskDelete, useTaskUpdates } from '@/features/app/task/lib/hook'
import { priorityList, statusList, type TaskSchema } from '@/features/app/task/lib/schema'
import { exportTableToCSV } from '@/libs/export'
import { ArrowUpIcon, CircleDashedIcon, DownloadSimpleIcon, TrashSimpleIcon } from '@phosphor-icons/react'
import { SelectTrigger } from '@radix-ui/react-select'
import type { Table } from '@tanstack/react-table'

interface TaskTableActionProps {
  table: Table<TaskSchema>
}

export const TaskTableAction = ({ table }: TaskTableActionProps) => {
  const rows = table.getFilteredSelectedRowModel().rows

  const updateTasksMutation = useTaskUpdates({
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

  const deleteTasksMutation = useTaskDelete({
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
    <TableAction table={table}>
      <TableActionSelection table={table} />
      <Separator orientation='vertical' className='hidden data-[orientation=vertical]:h-5 sm:block' />
      <div className='flex flex-wrap items-center justify-center gap-1.5'>
        <Select onValueChange={onUpdateStatus}>
          <SelectTrigger asChild>
            <TableActionButton size='icon' tooltip='Update status'>
              <CircleDashedIcon />
            </TableActionButton>
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
            <TableActionButton size='icon' tooltip='Update priority'>
              <ArrowUpIcon />
            </TableActionButton>
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
        <TableActionButton size='icon' tooltip='Export tasks' onClick={onExport}>
          <DownloadSimpleIcon />
        </TableActionButton>
        <TableActionButton size='icon' tooltip='Delete tasks' onClick={onDelete}>
          <TrashSimpleIcon />
        </TableActionButton>
        {/*  <TaskDelete
          tasks={rows.map(r => r.original)}
          onSuccess={() => table.toggleAllPageRowsSelected(false)}
          trigger={
            <TableActionButton size='icon' tooltip='Delete tasks'>
              <TrashSimpleIcon />
            </TableActionButton>
          } /> */}
      </div>
    </TableAction>
  )
}
