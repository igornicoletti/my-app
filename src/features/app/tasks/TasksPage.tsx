import { useMemo, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

import { DataTable, Toolbar } from '@/components/datatable'
import type { TaskLoaderData, TaskSchema } from '@/features/app/tasks/api'
import { getTasksTableColumns } from '@/features/app/tasks/datatable'
import { useDataTable } from '@/hooks/useDataTable'
import type { DataTableRowAction } from '@/types/datatable'

const UpdateTaskSheet = ({ open, onOpenChange, task }: { open: boolean; onOpenChange: () => void; task: TaskSchema | null }) => {
  if (!open) return null
  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center'>
      <div className='bg-white p-8 rounded-lg'>
        <h2 className='font-bold text-lg'>Editing Task: {task?.code}</h2>
        <p>Title: {task?.title}</p>
        <button onClick={onOpenChange} className='mt-4 p-2 bg-gray-200 rounded'>Close</button>
      </div>
    </div>
  )
}

const DeleteTasksDialog = ({ open, onOpenChange, tasks }: { open: boolean; onOpenChange: () => void; tasks: TaskSchema[] }) => {
  if (!open || tasks.length === 0) return null
  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center'>
      <div className='bg-white p-8 rounded-lg'>
        <h2 className='font-bold text-lg'>Delete Task</h2>
        <p>Are you sure you want to delete task: {tasks[0].code}?</p>
        <div className='flex gap-4 mt-4'>
          <button onClick={onOpenChange} className='p-2 bg-red-500 text-white rounded'>Confirm Delete</button>
          <button onClick={onOpenChange} className='p-2 bg-gray-200 rounded'>Cancel</button>
        </div>
      </div>
    </div>
  )
}


export const TasksPage = () => {
  const { tasks, statusCounts, priorityCounts } = useLoaderData() as TaskLoaderData

  const [rowAction, setRowAction] = useState<DataTableRowAction<TaskSchema> | null>(null)

  const columns = useMemo(
    () =>
      getTasksTableColumns({
        statusCounts,
        priorityCounts,
        setRowAction,
      }),
    [statusCounts, priorityCounts],
  )

  const table = useDataTable({
    data: tasks,
    columns,
    initialState: {
      columnPinning: { right: ['actions'] },
    },
    getRowId: (originalRow) => originalRow.id,
  })

  return (
    <>
      <div className='flex flex-col gap-6'>
        <header className='grid gap-2'>
          <h2 className='text-xl font-bold'>Tasks Table</h2>
          <p className='text-sm text-muted-foreground'>
            Here's a list of your tasks.
          </p>
        </header>

        <DataTable table={table}>
          <Toolbar table={table} />
        </DataTable>
      </div>

      <UpdateTaskSheet
        open={rowAction?.variant === 'update'}
        onOpenChange={() => setRowAction(null)}
        task={rowAction?.row.original ?? null}
      />
      <DeleteTasksDialog
        open={rowAction?.variant === 'delete'}
        onOpenChange={() => {
          rowAction?.row.toggleSelected(false)
          setRowAction(null)
        }}
        tasks={rowAction?.row.original ? [rowAction.row.original] : []}
      />
    </>
  )
}
