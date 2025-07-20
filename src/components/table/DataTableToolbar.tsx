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
  const titleColumn = table.getColumn('title')
  const statusColumn = table.getColumn('status')
  const priorityColumn = table.getColumn('priority')
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex flex-1 items-center gap-2'>
      {titleColumn && (
        <Input onChange={(event) => titleColumn.setFilterValue(event.target.value)} value={(titleColumn.getFilterValue() as string) ?? ''} placeholder='Filter...' className='max-w-xs' />
      )}
      {statusColumn && (
        <DataTableFacetedFilter options={statuses} column={statusColumn} title='Status' />
      )}
      {priorityColumn && (
        <DataTableFacetedFilter options={priorities} column={priorityColumn} title='Priority' />
      )}
      {isFiltered && (
        <Button onClick={() => table.resetColumnFilters()} variant='ghost'>
          Reset
          <XIcon />
        </Button>
      )}
      <DataTableViewOptions table={table} />
    </div>
  )
}
