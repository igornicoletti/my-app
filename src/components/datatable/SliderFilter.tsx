import { PlusCircleIcon, XCircleIcon } from '@phosphor-icons/react'
import type { Column } from '@tanstack/react-table'
import { useCallback, useId, useMemo, type ChangeEvent, type MouseEvent } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

interface Range {
  min: number
  max: number
}

type RangeValue = [number, number]

const getIsValidRange = (value: unknown): value is RangeValue => {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    typeof value[0] === 'number' &&
    typeof value[1] === 'number'
  )
}

interface SliderFilterProps<TData> {
  column: Column<TData, unknown>
  title?: string
}

export const SliderFilter = <TData,>({
  column,
  title,
}: SliderFilterProps<TData>) => {
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
        if (
          typeof facetMinValue === 'number' &&
          typeof facetMaxValue === 'number'
        ) {
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

  const range = useMemo((): RangeValue => {
    return columnFilterValue ?? [min, max]
  }, [columnFilterValue, min, max])

  const formatValue = useCallback((value: number) => {
    return value.toLocaleString(undefined, { maximumFractionDigits: 0 })
  }, [])

  const onFromInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value)
    if (!Number.isNaN(numValue) && numValue >= min && numValue <= range[1]) {
      column.setFilterValue([numValue, range[1]])
    }
  }, [column, min, range])

  const onToInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value)
    if (!Number.isNaN(numValue) && numValue <= max && numValue >= range[0]) {
      column.setFilterValue([range[0], numValue])
    }
  }, [column, max, range])

  const onSliderValueChange = useCallback((value: RangeValue) => {
    if (Array.isArray(value) && value.length === 2) {
      column.setFilterValue(value)
    }
  }, [column])

  const onReset = useCallback((event: MouseEvent) => {
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
            <div
              role='button'
              aria-label={`Clear ${title} filter`}
              tabIndex={0}
              onClick={onReset}>
              <XCircleIcon />
            </div>
          ) : (
            <PlusCircleIcon />
          )}
          {title}
          {columnFilterValue ? (
            <>
              <Separator orientation='vertical' className='mx-0.5 data-[orientation=vertical]:h-4' />
              <Badge variant='secondary' className='rounded-sm px-1 font-normal'>
                {formatValue(columnFilterValue[0])} -{' '}
                {formatValue(columnFilterValue[1])}
                {unit ? ` ${unit}` : ''}
              </Badge>
            </>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className='flex w-full max-w-[var(--radix-popover-content-available-width)] origin-[var(--radix-popover-content-transform-origin)] flex-col gap-4 p-2'>
        <div className='flex items-center gap-2'>
          <div className='relative'>
            <Input
              id={`${id}-from`}
              name={`${column.id}-from`}
              type='number'
              aria-valuemin={min}
              aria-valuemax={max}
              inputMode='numeric'
              pattern='[0-9]*'
              placeholder={min.toString()}
              min={min}
              max={max}
              value={range[0]?.toString()}
              onChange={onFromInputChange}
              className={cn('h-8 w-24', unit && 'pr-8')}
            />
            {unit && (
              <span className='absolute top-0 right-0 bottom-0 flex items-center px-2 text-muted-foreground text-sm'>
                {unit}
              </span>
            )}
          </div>
          <div className='relative'>
            <Input
              id={`${id}-to`}
              name={`${column.id}-to`}
              type='number'
              aria-valuemin={min}
              aria-valuemax={max}
              inputMode='numeric'
              pattern='[0-9]*'
              placeholder={max.toString()}
              min={min}
              max={max}
              value={range[1]?.toString()}
              onChange={onToInputChange}
              className={cn('h-8 w-24', unit && 'pr-8')}
            />
            {unit && (
              <span className='absolute top-0 right-0 bottom-0 flex items-center px-2 text-muted-foreground text-sm'>
                {unit}
              </span>
            )}
          </div>
        </div>
        <Slider
          aria-label={`${title} slider`}
          min={min}
          max={max}
          step={step}
          value={range}
          onValueChange={onSliderValueChange}
        />
        <Button
          aria-label={`Clear ${title} filter`}
          variant='outline'
          size='sm'
          onClick={onReset}>
          Clear
        </Button>
      </PopoverContent>
    </Popover>
  )
}
