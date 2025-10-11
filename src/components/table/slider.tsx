import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldTitle } from '@/components/ui/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { FunnelSimpleIcon, XIcon } from '@phosphor-icons/react'
import type { Column } from '@tanstack/react-table'
import { useCallback, useId, useMemo } from 'react'

interface Range {
  min: number
  max: number
}

type RangeValue = [number, number]

const getIsValidRange = (value: unknown): value is RangeValue =>
  Array.isArray(value) &&
  value.length === 2 &&
  typeof value[0] === 'number' &&
  typeof value[1] === 'number'

interface TableSliderProps<TData> {
  column: Column<TData, unknown>
  title?: string
}

export const TableSlider = <TData,>({
  column,
  title,
}: TableSliderProps<TData>) => {
  const id = useId()

  const columnFilterValue = getIsValidRange(column.getFilterValue())
    ? (column.getFilterValue() as RangeValue)
    : undefined

  const defaultRange = column.columnDef.meta?.range
  const unit = column.columnDef.meta?.unit

  const { min, max, step } = useMemo<Range & { step: number }>(() => {
    let minValue = 0
    let maxValue = 100

    if (defaultRange && getIsValidRange(defaultRange)) {
      [minValue, maxValue] = defaultRange
    } else {
      const values = column.getFacetedMinMaxValues()
      if (values && Array.isArray(values) && values.length === 2) {
        const [facetMinValue, facetMaxValue] = values
        if (typeof facetMinValue === 'number' && typeof facetMaxValue === 'number') {
          minValue = facetMinValue
          maxValue = facetMaxValue
        }
      }
    }

    const rangeSize = maxValue - minValue
    const step = rangeSize <= 20
      ? 1
      : rangeSize <= 100
        ? Math.ceil(rangeSize / 20)
        : Math.ceil(rangeSize / 50)

    return { min: minValue, max: maxValue, step }
  }, [column, defaultRange])

  const range = useMemo<RangeValue>(() =>
    columnFilterValue ?? [min, max], [columnFilterValue, min, max])

  const formatValue = useCallback((value: number) => value.toLocaleString(undefined, {
    maximumFractionDigits: 0
  }), [])

  const onSliderValueChange = useCallback((value: RangeValue) => {
    if (Array.isArray(value) && value.length === 2) {
      column.setFilterValue(value)
    }
  }, [column])

  const onReset = useCallback((event: React.MouseEvent) => {
    if (event.target instanceof HTMLDivElement) {
      event.stopPropagation()
    }
    column.setFilterValue(undefined)
  }, [column])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='border-dashed'>
          {columnFilterValue ? (
            <div role='button' aria-label={`Clear ${title} filter`} tabIndex={0} onClick={onReset}>
              <XIcon />
            </div>
          ) : (
            <FunnelSimpleIcon />
          )}
          <span>{title}</span>
          {columnFilterValue && (
            <>
              <Separator orientation='vertical' className='mx-0.5 data-[orientation=vertical]:h-4' />
              <Badge variant='secondary' className='rounded-sm px-1 font-normal'>
                {formatValue(columnFilterValue[0])} - {formatValue(columnFilterValue[1])}
                {unit ? ` ${unit}` : ''}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className='flex w-auto flex-col gap-6 p-4'>
        <Field>
          <FieldTitle>{title} slider</FieldTitle>
          <FieldDescription>
            Set your hour range (<span className='font-medium tabular-nums'>{range[0]} - {range[1]}</span>h).
          </FieldDescription>
          <Slider
            value={range}
            onValueChange={onSliderValueChange}
            max={max}
            min={min}
            step={step}
            className='mt-2 w-full'
            aria-label={`${id}-slider`} />
        </Field>
        {columnFilterValue && (
          <Button onClick={onReset} variant='outline' size='sm'>
            Clear {title} Filter
          </Button>
        )}
      </PopoverContent>
    </Popover>
  )
}
