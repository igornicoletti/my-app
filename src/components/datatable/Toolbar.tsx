import { ArrowsClockwiseIcon } from '@phosphor-icons/react'
import type { Column, Table } from '@tanstack/react-table'
import { useCallback, useMemo, type ComponentProps } from 'react'

import { DateFilter, FacetedFilter, SliderFilter, ViewOptions } from '@/components/datatable'
import { Button, Input } from '@/components/ui'
import { cn } from '@/lib/utils'

interface ToolbarProps<TData> extends ComponentProps<'div'> {
  table: Table<TData>
}

export const Toolbar = <TData,>({
  table,
  children,
  className,
  ...props
}: ToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0

  const columns = useMemo(() => table.getAllColumns().filter((column) =>
    column.getCanFilter()
  ), [table])

  const onReset = useCallback(() => {
    table.resetColumnFilters()
  }, [table])

  return (
    <div
      role='toolbar'
      aria-orientation='horizontal'
      className={cn('flex flex-wrap w-full items-start justify-between gap-2 p-1', className)}
      {...props}>
      <div className='flex flex-1 flex-wrap items-center gap-2'>
        {columns.map((column) => (
          <ToolbarFilter key={column.id} column={column} />
        ))}
        {isFiltered && (
          <Button
            aria-label='Reset filters'
            variant='outline'
            size='sm'
            onClick={onReset}
            className='border-dashed'>
            <ArrowsClockwiseIcon />
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

const ToolbarFilter = <TData,>({
  column
}: ToolbarFilterProps<TData>) => {
  {
    const columnMeta = column.columnDef.meta

    const onFilterRender = useCallback(() => {
      if (!columnMeta?.variant) return null

      switch (columnMeta.variant) {
        case 'text':
          return (
            <Input
              name={column.id}
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(event) => column.setFilterValue(event.target.value)}
              className={cn('h-8 min-w-max lg:w-56', columnMeta.unit && 'pr-8')}
            />
          )

        case 'number':
          return (
            <div className='relative'>
              <Input
                name={column.id}
                type='number'
                inputMode='numeric'
                placeholder={columnMeta.placeholder ?? columnMeta.label}
                value={(column.getFilterValue() as string) ?? ''}
                onChange={(event) => column.setFilterValue(event.target.value)}
                className={cn('h-8 w-full md:w-28', columnMeta.unit && 'pr-8')}
              />
              {columnMeta.unit && (
                <span className='absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm'>
                  {columnMeta.unit}
                </span>
              )}
            </div>
          )

        case 'range':
          return (
            <SliderFilter
              column={column}
              title={columnMeta.label ?? column.id}
            />
          )

        case 'date':
        case 'dateRange':
          return (
            <DateFilter
              column={column}
              title={columnMeta.label ?? column.id}
              multiple={columnMeta.variant === 'dateRange'}
            />
          )

        case 'select':
        case 'multiSelect':
          return (
            <FacetedFilter
              column={column}
              title={columnMeta.label ?? column.id}
              options={columnMeta.options ?? []}
              multiple={columnMeta.variant === 'multiSelect'}
            />
          )

        default:
          return null
      }
    }, [column, columnMeta])

    return onFilterRender()
  }
}
