import { XIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'

import {
  Button,
  DataTableFacetedFilter,
  DataTableViewOptions,
  Input,
  priorities,
  statuses
} from '@/components'

export const DataTableToolbar = <TData,>({ table }: { table: Table<TData> }) => {
  const isFiltered = table.getState().columnFilters.length > 0

  const titleColumn = table.getColumn('title')
  const statusColumn = table.getColumn('status')
  const priorityColumn = table.getColumn('priority')

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center gap-2'>
        {titleColumn && (
          <Input
            value={(titleColumn.getFilterValue() as string) ?? ''}
            onChange={(event) => titleColumn.setFilterValue(event.target.value)}
            placeholder='Filter tasks...'
            aria-label='Filter tasks'
            className='h-8 w-40 lg:w-64'
          />
        )}

        <div className='hidden lg:flex items-center gap-2'>
          {statusColumn && (
            <DataTableFacetedFilter
              options={statuses}
              column={statusColumn}
              title='Status' />
          )}

          {priorityColumn && (
            <DataTableFacetedFilter
              options={priorities}
              column={priorityColumn}
              title='Priority' />
          )}

          {isFiltered && (
            <Button
              size='sm'
              variant='ghost'
              onClick={() => table.resetColumnFilters()}
              aria-label='Clear filters'>
              Reset
              <XIcon className='ml-1 size-4' aria-hidden='true' />
            </Button>
          )}
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <DataTableViewOptions table={table} />
        <Button size='sm'>Add Task</Button>
      </div>
    </div>
  )
}
