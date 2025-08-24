import { DownloadSimpleIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { CreateTasks } from '@/features/app/tasks/components/CreateTasks'
import { DeleteTasks } from '@/features/app/tasks/components/DeleteTasks'
import type { TaskSchema } from '@/features/app/tasks/lib/schema'
import { exportTableToCSV } from '@/lib/export'

interface TasksToolbarActionsProps {
  table: Table<TaskSchema>
}

export function TasksToolbarActions({
  table
}: TasksToolbarActionsProps) {
  return (
    <div className='flex items-center gap-2'>
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteTasks
          tasks={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
      <Button
        variant='outline'
        size='sm'
        onClick={() =>
          exportTableToCSV(table, {
            filename: 'tasks',
            excludeColumns: ['select', 'actions'],
          })
        }>
        <DownloadSimpleIcon />
        Export
      </Button>
      <CreateTasks />
    </div>
  )
}
