import type { Column } from '@tanstack/react-table'
import {
  useCallback,
  useMemo,
  type ComponentProps
} from 'react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { ExtendedColumnFilter } from '@/types/datatable'

interface RangeFilterProps<TData> extends ComponentProps<'div'> {
  filter: ExtendedColumnFilter<TData>
  column: Column<TData>
  inputId: string
  onFilterUpdate: (
    filterId: string,
    updates: Partial<Omit<ExtendedColumnFilter<TData>, 'filterId'>>
  ) => void
}

export const RangeFilter = <TData,>({
  filter,
  column,
  inputId,
  onFilterUpdate,
  className,
  ...props
}: RangeFilterProps<TData>) => {
  const meta = column.columnDef.meta

  const [min, max] = useMemo(() => {
    const range = meta?.range
    if (range) return range

    const values = column.getFacetedMinMaxValues()
    if (!values) return [0, 100]

    return [values[0], values[1]]
  }, [column, meta])

  const formatValue = useCallback((value: string | number | undefined) => {
    if (value === undefined || value === '') return ''
    const numValue = Number(value)
    return Number.isNaN(numValue)
      ? ''
      : numValue.toLocaleString(undefined, { maximumFractionDigits: 0 })
  }, [])

  const value = useMemo(() => {
    if (Array.isArray(filter.value)) return filter.value.map(formatValue)
    return [formatValue(filter.value), '']
  }, [filter.value, formatValue])

  const onRangeValueChange = useCallback(
    (value: string, isMin?: boolean) => {
      const numValue = Number(value)
      const currentValues = Array.isArray(filter.value) ? filter.value : ['', '']
      const otherValue = isMin ? (currentValues[1] ?? '') : (currentValues[0] ?? '')

      if (
        value === '' ||
        (!Number.isNaN(numValue) &&
          (isMin
            ? numValue >= min && numValue <= (Number(otherValue) || max)
            : numValue <= max && numValue >= (Number(otherValue) || min)))
      ) {
        onFilterUpdate(filter.filterId, {
          value: isMin ? [value, otherValue] : [otherValue, value],
        })
      }
    },
    [filter.filterId, filter.value, min, max, onFilterUpdate]
  )

  return (
    <div data-slot='range' className={cn('flex w-full items-center gap-2', className)} {...props}>
      <Input
        id={`${inputId}-min`}
        type='number'
        aria-label={`${meta?.label} minimum value`}
        aria-valuemin={min}
        aria-valuemax={max}
        data-slot='range-min'
        inputMode='numeric'
        placeholder={min.toString()}
        min={min}
        max={max}
        className='h-8 w-full rounded'
        defaultValue={value[0]}
        onChange={(e) => onRangeValueChange(e.target.value, true)}
      />
      <span className='sr-only shrink-0 text-muted-foreground'>to</span>
      <Input
        id={`${inputId}-max`}
        type='number'
        aria-label={`${meta?.label} maximum value`}
        aria-valuemin={min}
        aria-valuemax={max}
        data-slot='range-max'
        inputMode='numeric'
        placeholder={max.toString()}
        min={min}
        max={max}
        className='h-8 w-full rounded'
        defaultValue={value[1]}
        onChange={(e) => onRangeValueChange(e.target.value)}
      />
    </div>
  )
}
