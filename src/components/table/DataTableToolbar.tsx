import {
  XIcon
} from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'

import {
  Button,
  CustomizeColumns,
  FacetedFilter,
  Input
} from '@/components'

type FacetedFilterOption = {
  label: string
  value: string
  icon?: React.ComponentType<{
    className?: string
  }>
}

type ToolbarFilter = {
  id: string
  title: string
  options: FacetedFilterOption[]
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filters?: ToolbarFilter[]
  globalFilterColumnId?: string
}

export const DataTableToolbar = <TData,>({
  table,
  filters = [],
  globalFilterColumnId = 'name'
}: DataTableToolbarProps<TData>) => {
  const globalColumn = table.getColumn(globalFilterColumnId)
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex flex-1 items-center gap-2'>
      {globalColumn && (
        <Input
          onChange={(event) => globalColumn.setFilterValue(event.target.value)}
          value={(globalColumn.getFilterValue() as string) ?? ''}
          placeholder='Filter...'
          className='max-w-xs'
        />
      )}

      {filters.map((filter) => {
        const column = table.getColumn(filter.id)
        return (
          column && (
            <FacetedFilter
              key={filter.id}
              column={column}
              title={filter.title}
              options={filter.options}
            />
          )
        )
      })}

      {isFiltered && (
        <Button onClick={() => table.resetColumnFilters()} variant='ghost'>
          Reset
          <XIcon />
        </Button>
      )}

      <CustomizeColumns table={table} />
    </div>
  )
}
