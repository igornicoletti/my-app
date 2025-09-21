import { DateFilter } from '@/components/table/date-filter'
import { FacetedFilter } from '@/components/table/faceted-filter'
import { SliderFilter } from '@/components/table/slider-filter'
import { ViewOptions } from '@/components/table/view-options'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ArrowsClockwiseIcon } from '@phosphor-icons/react'
import type { Column, Table } from '@tanstack/react-table'
import { useMemo, type ComponentProps, type JSX } from 'react'

type FilterComponentProps<TData> = {
  column: Column<TData, unknown>
}

const TextInputFilter = <TData,>({ column }: FilterComponentProps<TData>) => {
  const meta = column.columnDef.meta
  return (
    <Input
      placeholder={meta?.placeholder ?? meta?.label}
      value={(column.getFilterValue() as string) ?? ''}
      onChange={(event) => column.setFilterValue(event.target.value)}
      className='h-8 min-w-max lg:w-56'
    />
  )
}

const NumberInputFilter = <TData,>({ column }: FilterComponentProps<TData>) => {
  const meta = column.columnDef.meta
  return (
    <div className='relative'>
      <Input
        type='number'
        inputMode='numeric'
        placeholder={meta?.placeholder ?? meta?.label}
        value={(column.getFilterValue() as string) ?? ''}
        onChange={(event) => column.setFilterValue(event.target.value)}
        className={cn('h-8 w-28', meta?.unit && 'pr-8')}
      />
      {meta?.unit && (
        <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center rounded-r-md bg-accent px-2 text-sm text-muted-foreground'>
          {meta.unit}
        </span>
      )}
    </div>
  )
}

const filterComponentMap: Record<string, (props: FilterComponentProps<any>) => JSX.Element> = {
  text: TextInputFilter,
  number: NumberInputFilter,
  range: ({ column }) => <SliderFilter column={column} title={column.columnDef.meta?.label ?? column.id} />,
  date: ({ column }) => <DateFilter column={column} title={column.columnDef.meta?.label ?? column.id} />,
  dateRange: ({ column }) => <DateFilter column={column} title={column.columnDef.meta?.label ?? column.id} />,
  select: ({ column }) => (
    <FacetedFilter
      column={column}
      title={column.columnDef.meta?.label ?? column.id}
      options={column.columnDef.meta?.options ?? []}
    />
  ),
  multiSelect: ({ column }) => (
    <FacetedFilter
      column={column}
      title={column.columnDef.meta?.label ?? column.id}
      options={column.columnDef.meta?.options ?? []}
      multiple
    />
  ),
}

const Filter = <TData,>({ column }: FilterComponentProps<TData>) => {
  const FilterComponent = filterComponentMap[column.columnDef.meta?.variant as string]
  return FilterComponent ? <FilterComponent column={column} /> : null
}

interface PrimaryFiltersProps<TData> {
  table: Table<TData>
}

export const PrimaryFilters = <TData,>({ table }: PrimaryFiltersProps<TData>) => {
  const filterableColumns = useMemo(() => table.getAllColumns().filter((column) =>
    column.getCanFilter() && column.columnDef.meta?.variant
  ), [table.getAllColumns()])

  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <>
      {filterableColumns.map((column) => <Filter key={column.id} column={column} />)}
      {isFiltered && (
        <Button
          aria-label='Reset filters'
          variant='outline'
          size='sm'
          className='h-8 border border-dashed'
          onClick={() => table.resetColumnFilters()}>
          <ArrowsClockwiseIcon />
          Reset
        </Button>
      )}
    </>
  )
}

interface ToolbarProps<TData> extends ComponentProps<'div'> {
  table: Table<TData>
}

export const Toolbar = <TData,>({ table, children, className, ...props }: ToolbarProps<TData>) => (
  <div
    role='toolbar'
    aria-label='Table Toolbar'
    className={cn('flex w-full flex-wrap items-end justify-between gap-4', className)}
    {...props}>
    <div className='flex flex-1 flex-wrap items-center gap-2'>
      <PrimaryFilters table={table} />
    </div>
    <div className='flex items-center gap-2'>
      <ViewOptions table={table} />
      {children}
    </div>
  </div>
)
