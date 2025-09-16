import { Button } from '@/components/ui/button'
import { DeleteTasks } from '@/features/app/tasks/components/delete'
import { TaskSheet } from '@/features/app/tasks/components/task-sheet'
import type { TaskSchema } from '@/features/app/tasks/lib/schemas'
import { exportTableToCSV } from '@/lib/export'
import { DownloadSimpleIcon, SparkleIcon } from '@phosphor-icons/react'
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
      {selectedTasks.length > 0 ? (
        <DeleteTasks
          tasks={selectedTasks}
          onSuccess={() => table.toggleAllRowsSelected(false)} />
      ) : null}
      <TaskSheet
        trigger={
          <Button variant='default' size='sm'>
            <SparkleIcon />
            Create
          </Button>
        }
      />
    </div>
  )
}
