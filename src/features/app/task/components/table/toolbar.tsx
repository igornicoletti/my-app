import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
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
    <div className='flex items-center gap-2'>
      <Button variant='secondary' size='sm' onClick={onExport}>
        <DownloadSimpleIcon />
        Export
      </Button>
      {selectedTasks.length > 0 && (
        <TaskDelete
          tasks={selectedTasks}
          onSuccess={() => table.toggleAllRowsSelected(false)}
          trigger={
            <Button variant='secondary' size='sm'>
              <TrashSimpleIcon />
              <span>Delete</span>
              <Separator orientation='vertical' className='mx-0.5 data-[orientation=vertical]:h-4' />
              <Badge variant='outline' className='rounded-sm px-1 font-normal'>
                {selectedTasks.length}
              </Badge>
            </Button>
          } />
      )}
      <TaskEntity trigger={
        <Button variant='secondary' size='sm'>
          <SparkleIcon />
          Create Task
        </Button>
      } />
    </div>
  )
}
