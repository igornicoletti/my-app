import { useCallback, useMemo } from 'react'

import { XIcon } from '@phosphor-icons/react'
import type { Column, Table } from '@tanstack/react-table'

import { FacetedFilter } from '@/components/table/FacetedFilter'
import { Button, Input } from '@/components/ui'
import type { ColumnMeta } from '@/features/app/tasks/data/tasks.types'

interface ToolbarProps<TData> {
  table: Table<TData>
  children?: React.ReactNode
}

export const Toolbar = <TData,>({ table, children }: ToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0

  const columns = useMemo(() => {
    return table.getAllColumns().filter((column) => column.getCanFilter())
  }, [table])

  const onReset = useCallback(() => {
    table.resetColumnFilters()
  }, [table])

  return (
    <div role='toolbar' aria-orientation='horizontal' className='flex w-full items-start justify-between gap-2'>
      <div className='flex flex-1 flex-wrap items-center gap-2'>
        {columns.map((column) => (
          <ToolbarFilter key={column.id} column={column} />
        ))}
        {isFiltered && (
          <Button onClick={onReset} aria-label='Reset filters' variant='ghost'>
            <XIcon />
            Reset
          </Button>
        )}
      </div>
      <div className='flex items-center gap-2'>
        {children}
      </div>
    </div>
  )
}

interface ToolbarFilterProps<TData> {
  column: Column<TData>
}

const ToolbarFilter = <TData,>({ column }: ToolbarFilterProps<TData>) => {
  const meta = column.columnDef.meta as ColumnMeta

  if (!meta?.variant) return null

  if (meta.variant === 'text' || meta.variant === 'number') {
    return (
      <div className='relative'>
        <Input
          type={meta.variant === 'number' ? 'number' : 'text'}
          inputMode={meta.variant === 'number' ? 'numeric' : undefined}
          placeholder={meta.placeholder ?? meta.label}
          value={(column.getFilterValue() as string) ?? ''}
          onChange={(e) => column.setFilterValue(e.target.value)}
          className='min-w-xs' />
        {meta.variant === 'number' && meta.unit && (
          <span className='absolute right-0 top-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-sm text-muted-foreground'>
            {meta.unit}
          </span>
        )}
      </div>
    )
  }

  if (meta.variant === 'multiSelect' || meta.variant === 'select') {
    return (
      <FacetedFilter
        column={column}
        title={meta.label}
        options={meta.options ?? []}
      />
    )
  }

  return null
}
