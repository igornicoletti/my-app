import { ArrowUpIcon, CheckCircleIcon, DownloadSimpleIcon, TrashSimpleIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'
import { useCallback, useState, useTransition } from 'react'
import { toast } from 'sonner'

import { ActionBar, ActionBarAction, ActionBarSelection } from '@/components/datatable'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, Separator } from '@/components/ui'
import { deleteTasks, updateTasks } from '@/features/app/tasks/lib/actions'
import { taskSchema, type TaskSchema } from '@/features/app/tasks/lib/schema'
import { exportTableToCSV } from '@/lib/export'

const actions = [
  'update-status',
  'update-priority',
  'export',
  'delete',
] as const

type Action = (typeof actions)[number]

interface TasksActionBarProps {
  table: Table<TaskSchema>
}

export const TasksActionBar = ({ table }: TasksActionBarProps) => {
  const rows = table.getFilteredSelectedRowModel().rows
  const [isPending, startTransition] = useTransition()
  const [currentAction, setCurrentAction] = useState<Action | null>(null)

  const getIsActionPending = useCallback((action: Action) =>
    isPending && currentAction === action,
    [isPending, currentAction]
  )

  const onTaskUpdate = useCallback(
    ({
      field,
      value,
    }: {
      field: 'status' | 'priority'
      value: TaskSchema['status'] | TaskSchema['priority']
    }) => {
      setCurrentAction(field === 'status' ? 'update-status' : 'update-priority')
      startTransition(async () => {
        const { error } = await updateTasks({
          ids: rows.map((row) => row.original.id),
          [field]: value,
        })

        if (error) {
          toast.error(error)
          return
        }
        toast.success('Tasks updated')
      })
    }, [rows])


  const onTaskExport = useCallback(() => {
    setCurrentAction('export')
    startTransition(() => {
      exportTableToCSV(table, {
        excludeColumns: ['select', 'actions'],
        onlySelected: true,
      })
    })
  }, [table])

  const onTaskDelete = useCallback(() => {
    setCurrentAction('delete')
    startTransition(async () => {
      const { error } = await deleteTasks({
        ids: rows.map((row) => row.original.id),
      })

      if (error) {
        toast.error(error)
        return
      }
      table.toggleAllRowsSelected(false)
    })
  }, [rows, table])

  return (
    <ActionBar table={table} visible={rows.length > 0}>
      <ActionBarSelection table={table} />
      <Separator
        orientation='vertical'
        className='hidden data-[orientation=vertical]:h-5 sm:block'
      />
      <div className='flex items-center gap-1.5'>
        <Select
          onValueChange={(value: TaskSchema['status']) =>
            onTaskUpdate({ field: 'status', value })
          }>
          <SelectTrigger asChild>
            <ActionBarAction
              size='icon'
              tooltip='Update status'
              isPending={getIsActionPending('update-status')}>
              <CheckCircleIcon />
            </ActionBarAction>
          </SelectTrigger>
          <SelectContent align='center'>
            <SelectGroup>
              {taskSchema.shape.status.options.map((status) => (
                <SelectItem key={status} value={status} className='capitalize'>
                  {status}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value: TaskSchema['priority']) =>
            onTaskUpdate({ field: 'priority', value })
          }>
          <SelectTrigger asChild>
            <ActionBarAction
              size='icon'
              tooltip='Update priority'
              isPending={getIsActionPending('update-priority')}>
              <ArrowUpIcon />
            </ActionBarAction>
          </SelectTrigger>
          <SelectContent align='center'>
            <SelectGroup>
              {taskSchema.shape.priority.options.map((priority) => (
                <SelectItem
                  key={priority}
                  value={priority}
                  className='capitalize'>
                  {priority}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <ActionBarAction
          size='icon'
          tooltip='Export tasks'
          isPending={getIsActionPending('export')}
          onClick={onTaskExport}>
          <DownloadSimpleIcon />
        </ActionBarAction>
        <ActionBarAction
          size='icon'
          tooltip='Delete tasks'
          isPending={getIsActionPending('delete')}
          onClick={onTaskDelete}>
          <TrashSimpleIcon />
        </ActionBarAction>
      </div>
    </ActionBar>
  )
}
