import { DownloadSimpleIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { CreateTask } from '@/features/app/tasks/components/CreateTask'
import { DeleteTask } from '@/features/app/tasks/components/DeleteTask'
import type { TaskSchema } from '@/features/app/tasks/lib/types'
import { exportTableToCSV } from '@/lib/export'

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
      {selectedTasks.length > 0 ? (
        <DeleteTask
          tasks={selectedTasks}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
      <Button variant='secondary' size='sm' onClick={onExport}>
        <DownloadSimpleIcon />
        Export
      </Button>
      <CreateTask />
    </div>
  )
}
