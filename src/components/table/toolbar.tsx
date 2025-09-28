import { TableDate } from '@/components/table/date'
import { TableFaceted } from '@/components/table/faceted'
import { TableSlider } from '@/components/table/slider'
import { TableView } from '@/components/table/view'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/libs/utils'
import { ArrowsClockwiseIcon } from '@phosphor-icons/react'
import type { Column, Table } from '@tanstack/react-table'
import { useCallback, useMemo, type ComponentProps } from 'react'

interface TableToolbarProps<TData> extends ComponentProps<'div'> {
  table: Table<TData>
}

export const TableToolbar = <TData,>({
  table,
  children,
  className,
  ...props
}: TableToolbarProps<TData>) => {
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
      className={cn('flex w-full items-start justify-between gap-2', className)}
      {...props}>
      <div className='flex flex-1 flex-wrap items-center gap-2'>
        {columns.map(column => <TableToolbarFilter key={column.id} column={column} />)}
        {isFiltered && (
          <Button
            aria-label='Reset filters'
            variant='outline'
            size='sm'
            className='border-dashed'
            onClick={onReset}>
            <ArrowsClockwiseIcon />
            Reset
          </Button>
        )}
      </div>
      <div className='flex items-center gap-2'>
        <TableView table={table} />
        {children}
      </div>
    </div>
  )
}

interface TableToolbarFilterProps<TData> {
  column: Column<TData>
}

const TableToolbarFilter = <TData,>({ column }: TableToolbarFilterProps<TData>) => {
  const columnMeta = column.columnDef.meta

  const onFilterRender = useCallback(() => {
    if (!columnMeta?.variant) return null

    switch (columnMeta.variant) {
      case 'text':
        return (
          <Input
            id={`${column.id}-text`}
            placeholder={columnMeta.placeholder ?? columnMeta.label}
            value={(column.getFilterValue() as string) ?? ''}
            onChange={event => column.setFilterValue(event.target.value)}
            className='h-8 w-40 lg:w-56' />
        )

      case 'number':
        return (
          <div className='relative'>
            <Input
              id={`${column.id}-number`}
              type='number'
              inputMode='numeric'
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              value={(column.getFilterValue() as string) ?? ''}
              onChange={event => column.setFilterValue(event.target.value)}
              className={cn('h-8 w-40', columnMeta.unit && 'pr-8')} />
            {columnMeta.unit && (
              <span className='absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm'>
                {columnMeta.unit}
              </span>
            )}
          </div>
        )

      case 'range':
        return (
          <TableSlider
            column={column}
            title={columnMeta.label ?? column.id} />
        )

      case 'date':
      case 'dateRange':
        return (
          <TableDate
            column={column}
            title={columnMeta.label ?? column.id}
            multiple={columnMeta.variant === 'dateRange'} />
        )

      case 'select':
      case 'multiSelect':
        return (
          <TableFaceted
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
