import { XIcon } from '@phosphor-icons/react'
import type {
  Column,
  Table
} from '@tanstack/react-table'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ComponentProps
} from 'react'

import {
  DateFilter,
  FacetedFilter,
  ViewOptions
} from '@/components/datatable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ToolbarProps<TData> extends ComponentProps<'div'> {
  table: Table<TData>
}

export const Toolbar = <TData,>({
  table,
  children,
}: ToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0

  const columns = useMemo(() => table.getAllColumns().filter((column) =>
    column.getCanFilter()
  ), [table])

  const onReset = useCallback(() => {
    table.resetColumnFilters()
  }, [table])

  return (
    <div role='toolbar' aria-orientation='horizontal' className='flex w-full items-start justify-between'>
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
  const columnMeta = column.columnDef.meta as {
    variant?: 'text' | 'number' | 'date' | 'dateRange' | 'select' | 'multiSelect'
    placeholder?: string
    label?: string
    unit?: string
    options?: { label: string; value: string | number; icon?: React.ComponentType<{ className?: string }> }[]
  } | undefined

  const initialValue = (column.getFilterValue() as string) ?? ''
  const [inputValue, setInputValue] = useState(initialValue)

  useEffect(() => {
    setInputValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    if (columnMeta?.variant === 'text' || columnMeta?.variant === 'number') {
      const timeout = setTimeout(() => {
        if (inputValue !== column.getFilterValue()) {
          column.setFilterValue(inputValue)
        }
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [inputValue, column, columnMeta?.variant])


  if (!columnMeta?.variant) return null

  switch (columnMeta.variant) {
    case 'text':
      return (
        <Input
          placeholder={columnMeta.placeholder ?? columnMeta.label}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className='h-8 w-full md:w-xs'
        />
      )

    case 'number':
      return (
        <div className='relative'>
          <Input
            type='number'
            inputMode='numeric'
            placeholder={columnMeta.placeholder ?? columnMeta.label}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className='h-8 w-full md:w-xs'
          />
          {columnMeta.unit && (
            <span className='absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm'>
              {columnMeta.unit}
            </span>
          )}
        </div>
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
}
