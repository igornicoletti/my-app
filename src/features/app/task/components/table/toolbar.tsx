import { Button } from '@/components/ui/button'
import { TaskDelete } from '@/features/app/task/components/delete'
import { TaskEntity } from '@/features/app/task/components/entity'
import type { TaskSchema } from '@/features/app/task/lib/schema'
import { exportTableToCSV } from '@/libs/export'
import { DownloadSimpleIcon, SparkleIcon, TrashSimpleIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'

interface TaskToolbarProps {
  table: Table<TaskSchema>
}

export const TaskToolbar = ({ table }: TaskToolbarProps) => {
  const selectedTasks = table.getFilteredSelectedRowModel().rows.map((row) => row.original)

  const onExport = () => {
    exportTableToCSV(table, {
      filename: 'tasks',
      excludeColumns: ['select', 'actions'],
    })
  }

  return (
    <div className='flex flex-wrap items-center gap-2'>
      <Button variant='secondary' size='sm' onClick={onExport}>
        <DownloadSimpleIcon />
        Export
      </Button>
      {selectedTasks.length > 0 && (
        <TaskDelete
          tasks={selectedTasks}
          onConfirm={() => table.toggleAllRowsSelected(false)}
          trigger={
            <Button variant='secondary' size='sm'>
              <TrashSimpleIcon />
              Delete
            </Button>
          } />
      )}
      <TaskEntity trigger={
        <Button variant='secondary' size='sm'>
          <SparkleIcon />
          Create
        </Button>
      } />
    </div>
  )
}
