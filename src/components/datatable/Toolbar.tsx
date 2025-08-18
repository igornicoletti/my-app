import { XIcon } from '@phosphor-icons/react'
import type { Column, Table } from '@tanstack/react-table'
import { useCallback, type HTMLAttributes } from 'react'

import {
  DateFilter,
  FacetedFilter,
  SliderFilter,
  ViewOptions
} from '@/components/datatable'
import { Button, Input } from '@/components/ui'
import { cn } from '@/lib/utils'

interface ToolbarFilterProps<TData, TValue> {
  column: Column<TData, TValue>
}

const ToolbarFilter = <TData, TValue>({
  column
}: ToolbarFilterProps<TData, TValue>) => {
  const columnMeta = column.columnDef.meta

  const onFilterRender = useCallback(() => {
    if (!columnMeta?.variant) return null

    switch (columnMeta.variant) {
      case 'text':
        return (
          <Input
            value={(column.getFilterValue() as string) ?? ''}
            placeholder={columnMeta.placeholder ?? columnMeta.label}
            onChange={(e) => column.setFilterValue(e.target.value)}
            className='h-8 w-full md:w-64' />
        )

      case 'number':
        return (
          <div className='relative'>
            <Input
              type='number'
              inputMode='numeric'
              value={(column.getFilterValue() as string) ?? ''}
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              onChange={(e) => column.setFilterValue(e.target.value)}
              className='h-8 w-full lg:w-48' />
            {columnMeta.unit && (
              <span className='absolute inset-y-0 right-0 flex items-center px-2 text-sm text-muted-foreground'>
                {columnMeta.unit}
              </span>
            )}
          </div>
        )

      case 'range':
        return (
          <SliderFilter
            column={column}
            title={columnMeta.label ?? column.id} />
        )

      case 'date':
      case 'dateRange':
        return (
          <DateFilter
            column={column}
            title={columnMeta.label ?? column.id}
            multiple={columnMeta.variant === 'dateRange'} />
        )

      case 'select':
      case 'multiSelect':
        return (
          <FacetedFilter
            column={column}
            title={columnMeta.label ?? column.id}
            options={columnMeta.options ?? []}
            multiple={columnMeta.variant === 'multiSelect'} />
        )

      default:
        return null
    }
  }, [column, columnMeta])

  return onFilterRender()
}

interface ToolbarProps<TData> extends HTMLAttributes<HTMLDivElement> {
  table: Table<TData>
}

export const Toolbar = <TData,>({
  table,
  children,
  className,
  ...props
}: ToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0
  const filterableColumns = table.getAllColumns().filter((col) => col.getCanFilter())

  return (
    <div role='toolbar' aria-orientation='horizontal' className={cn('flex w-full flex-col-reverse flex-wrap-reverse items-baseline justify-between gap-2 p-1 sm:flex-row', className)} {...props}>
      <div className='flex flex-1 flex-wrap items-center gap-2'>
        {filterableColumns.map((column) => (
          <ToolbarFilter key={column.id} column={column} />
        ))}
        {isFiltered && (
          <Button onClick={() => table.resetColumnFilters()} size='sm' variant='ghost'>
            <XIcon /> Reset
          </Button>
        )}
      </div>
      <div className='flex items-center gap-2'>
        <ViewOptions table={table} />
        {children}
      </div>
    </div>
  )
}
