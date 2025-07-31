import { DateFilter, FacetedFilter } from '@/components/datatable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type {
  TColumnMeta,
  TToolbarProps,
  TToolbarVariantsProps
} from '@/types'
import { XIcon } from '@phosphor-icons/react'
import { useCallback, useMemo } from 'react'

export const ToolbarFilters = <TData,>({ table, children }: TToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0

  const columns = useMemo(() => {
    return table.getAllColumns().filter((column) => column.getCanFilter())
  }, [table])

  const handleReset = useCallback(() => {
    table.resetColumnFilters()
  }, [table])

  return (
    <div role='toolbar' aria-orientation='horizontal' className='flex w-full items-start justify-between gap-2'>
      <div className='flex flex-1 flex-wrap items-center gap-2'>
        {columns.map((column) => (
          <ToolbarVariants key={column.id} column={column} />
        ))}
        {isFiltered && (
          <Button onClick={handleReset} aria-label='Reset filters' variant='ghost'>
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

const ToolbarVariants = <TData,>({ column }: TToolbarVariantsProps<TData>) => {
  const meta = column.columnDef.meta as TColumnMeta | undefined
  if (!meta?.variant) return null

  if (meta.variant === 'text' || meta.variant === 'number') {
    return (
      <Input
        id={column.id}
        name={column.id}
        className='h-8 w-full max-w-xs'
        placeholder={meta.placeholder ?? meta.label}
        value={(column.getFilterValue() as string) ?? ''}
        type={meta.variant === 'number' ? 'number' : 'text'}
        inputMode={meta.variant === 'number' ? 'numeric' : undefined}
        onChange={(e) => column.setFilterValue(e.target.value)}
      />
    )
  }

  if (meta.variant === 'multiSelect' || meta.variant === 'select') {
    return (
      <FacetedFilter
        column={column}
        title={meta.label}
        options={meta.options ?? []} />
    )
  }

  if (meta.variant === 'date') {
    return (
      <DateFilter
        column={column}
        title={meta.label}
        multiple={meta.multiple}
      />
    )
  }

  return null
}
