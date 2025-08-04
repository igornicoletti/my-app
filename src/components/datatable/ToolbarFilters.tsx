import { useCallback, useMemo } from 'react'

import { DateFilter, FacetedFilter } from '@/components/datatable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { TColumnMeta, TToolbarProps, TToolbarVariantsProps } from '@/types'
import { XIcon } from '@phosphor-icons/react'

export const ToolbarFilters = <TData,>({ table, children }: TToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0

  const columns = useMemo(() => {
    return table.getAllColumns().filter((column) => column.getCanFilter())
  }, [table])

  const handleReset = useCallback(() => {
    table.resetColumnFilters()
  }, [table])

  return (
    <div role='toolbar' aria-orientation='horizontal' className='flex w-full flex-col-reverse md:flex-row items-start gap-2'>
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

  const onFilterRender = useCallback(() => {
    if (!meta?.variant) return null

    switch (meta.variant) {
      case 'text':
        return (
          <Input
            placeholder={meta.placeholder ?? meta.label}
            value={(column.getFilterValue() as string) ?? ''}
            onChange={(e) => column.setFilterValue(e.target.value)}
            className='w-full lg:max-w-xs'
          />
        )

      case 'date':
        return (
          <DateFilter
            column={column}
            title={meta.label ?? column.id}
          />
        )

      case 'select':
      case 'multiSelect':
        return (
          <FacetedFilter
            column={column}
            title={meta.label ?? column.id}
            options={meta.options ?? []}
            multiple={meta.variant === 'multiSelect'}
          />
        )

      default:
        return null
    }
  }, [column, meta])

  return onFilterRender()
}
