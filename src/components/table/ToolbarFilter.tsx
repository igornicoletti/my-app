import { XIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'

import { Button, FacetedFilter, Input, ViewOptions } from '@/components'

interface FacetOption {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

interface ToolbarFilterProps<TData> {
  table: Table<TData>
  filters?: {
    id: string
    title: string
    options: FacetOption[]
  }[]
}

export const ToolbarFilter = <TData,>({
  table, filters = []
}: ToolbarFilterProps<TData>) => {
  const globalFilter = table.getState().globalFilter as string
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div role='toolbar' className='flex w-full items-start justify-between gap-2'>
      <div className='flex flex-1 flex-wrap items-center gap-2'>
        <Input
          placeholder='Search...'
          value={globalFilter ?? ''}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className='max-w-xs'
        />

        {filters.map(({ id, title, options }) => {
          const column = table.getColumn(id)
          return column ? (
            <FacetedFilter key={id} column={column} title={title} options={options} />
          ) : null
        })}

        {isFiltered && (
          <Button onClick={() => table.resetColumnFilters()} variant='ghost'>
            Reset
            <XIcon />
          </Button>
        )}
      </div>

      <div className='flex items-center gap-2'>
        <ViewOptions table={table} />
      </div>
    </div>
  )
}
