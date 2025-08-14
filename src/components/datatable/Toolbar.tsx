import { XIcon } from '@phosphor-icons/react'
import type {
  Column,
  Table
} from '@tanstack/react-table'
import {
  useCallback,
  useMemo
} from 'react'

import { DateFilter } from '@/components/datatable/DateFilter'
import { FacetedFilter } from '@/components/datatable/FacetedFilter'
import { SliderFilter } from '@/components/datatable/SliderFilter'
import { ViewOptions } from '@/components/datatable/ViewOptions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface ToolbarProps<TData> extends React.ComponentProps<'div'> {
  table: Table<TData>
}

export const Toolbar = <TData,>({ table, children, className, ...props }: ToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0
  const columns = useMemo(() => table.getAllColumns().filter((col) => col.getCanFilter()), [table])
  const onReset = useCallback(() => table.resetColumnFilters(), [table])

  return (
    <div role='toolbar' aria-orientation='horizontal' className={cn('flex w-full items-start justify-between gap-2 p-1', className)} {...props}>
      <div className='flex flex-1 flex-wrap items-center gap-2'>
        {columns.map((column) => (
          <ToolbarFilter key={column.id} column={column} />
        ))}
        {isFiltered && (
          <Button aria-label='Reset filters' variant='outline' size='sm' className='border-dashed' onClick={onReset}>
            <XIcon />
            Reset
          </Button>
        )}
      </div>
      <div className='flex items-center gap-2'>
        {children}
        <ViewOptions table={table} />
      </div>
    </div>
  )
}

interface ToolbarFilterProps<TData> {
  column: Column<TData>
}

const ToolbarFilter = <TData,>({ column }: ToolbarFilterProps<TData>) => {
  const columnMeta = column.columnDef.meta

  return useMemo(() => {
    if (!columnMeta?.variant) return null

    switch (columnMeta.variant) {
      case 'text':
        return (
          <Input
            placeholder={columnMeta.placeholder ?? columnMeta.label}
            value={(column.getFilterValue() as string) ?? ''}
            onChange={(e) => column.setFilterValue(e.target.value)}
            className='h-8 w-40 lg:w-56' />
        )
      case 'number':
        return (
          <div className='relative'>
            <Input
              type='number'
              inputMode='numeric'
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(e) => column.setFilterValue(e.target.value)}
              className={cn('h-8 w-[120px]', columnMeta.unit && 'pr-8')} />
            {columnMeta.unit && (
              <span className='absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm'>
                {columnMeta.unit}
              </span>
            )}
          </div>
        )
      case 'range':
        return <SliderFilter
          column={column}
          title={columnMeta.label ?? column.id} />
      case 'date':
      case 'dateRange':
        return <DateFilter
          column={column}
          title={columnMeta.label ?? column.id}
          multiple={columnMeta.variant === 'dateRange'} />
      case 'select':
      case 'multiSelect':
        return <FacetedFilter
          column={column}
          title={columnMeta.label ?? column.id}
          options={columnMeta.options ?? []}
          multiple={columnMeta.variant === 'multiSelect'} />
      default:
        return null
    }
  }, [column, columnMeta])
}
