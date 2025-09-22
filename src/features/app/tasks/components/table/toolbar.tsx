import { Button } from '@/components/ui/button'
import { DeleteTasks } from '@/features/app/tasks/components/delete'
import { TaskSheet } from '@/features/app/tasks/components/sheet'
import type { TaskSchema } from '@/features/app/tasks/lib/schemas'
import { exportTableToCSV } from '@/libs/export'
import { DownloadSimpleIcon, SparkleIcon, TrashSimpleIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'

interface TasksToolbarActionsProps {
  table: Table<TaskSchema>
}

export const TasksToolbar = ({ table }: TasksToolbarActionsProps) => {
  const selectedTasks = table.getFilteredSelectedRowModel().rows.map((row) => row.original)

  const onExport = () => {
    exportTableToCSV(table, {
      filename: 'tasks',
      excludeColumns: ['select', 'actions'],
    })
  }

  return (
    <div className='flex flex-wrap items-center gap-2'>
      <Button variant='outline' size='sm' onClick={onExport}>
        <DownloadSimpleIcon />
        Export
      </Button>
      {selectedTasks.length > 0 && (
        <DeleteTasks
          tasks={selectedTasks}
          onConfirm={() => table.toggleAllRowsSelected(false)}
          trigger={
            <Button variant='outline' size='sm'>
              <TrashSimpleIcon />
              Delete
            </Button>
          } />
      )}
      <TaskSheet
        trigger={
          <Button variant='secondary' size='sm'>
            <SparkleIcon />
            Create
          </Button>
        } />
    </div>
  )
}
