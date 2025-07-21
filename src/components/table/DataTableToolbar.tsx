import { XIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'

import {
  Button,
  DataTableFacetedFilter,
  DataTableViewOptions,
  Input
} from '@/components'

const statuses = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Suspended', value: 'suspended' }
]

export const DataTableToolbar = <TData,>({ table }: { table: Table<TData> }) => {
  const nameColumn = table.getColumn('name')
  const statusColumn = table.getColumn('status')
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex flex-1 items-center gap-2'>
      {nameColumn && (
        <Input
          onChange={(event) => nameColumn.setFilterValue(event.target.value)}
          value={(nameColumn.getFilterValue() as string) ?? ''}
          placeholder='Filter...'
          className='max-w-xs'
        />
      )}
      {statusColumn && (
        <DataTableFacetedFilter
          options={statuses}
          column={statusColumn}
          title='Status'
        />
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
