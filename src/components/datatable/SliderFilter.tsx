import {
  PlusCircleIcon,
  XCircleIcon
} from '@phosphor-icons/react'
import type { Column } from '@tanstack/react-table'
import {
  useCallback,
  useId,
  useMemo,
  type ChangeEvent
} from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'

type RangeValue = [number, number]

const isRangeValue = (value: unknown): value is RangeValue =>
  Array.isArray(value) &&
  value.length === 2 &&
  typeof value[0] === 'number' &&
  typeof value[1] === 'number'

interface SliderFilterProps<TData> {
  column: Column<TData, unknown>
  title?: string
}

export const SliderFilter = <TData,>({ column, title }: SliderFilterProps<TData>) => {
  const id = useId()
  const columnFilterValue = column.getFilterValue()
  const range: RangeValue = useMemo(() => {
    if (isRangeValue(columnFilterValue)) return columnFilterValue

    const defaultRange = column.columnDef.meta?.range
    if (isRangeValue(defaultRange)) return defaultRange

    const facetValues = column.getFacetedMinMaxValues()
    if (facetValues && facetValues.length === 2 && typeof facetValues[0] === 'number' && typeof facetValues[1] === 'number') {
      return [facetValues[0], facetValues[1]]
    }

    return [0, 100]
  }, [column, columnFilterValue])

  const unit = column.columnDef.meta?.unit

  const step = useMemo(() => {
    const rangeSize = range[1] - range[0]
    return rangeSize <= 20 ? 1 : rangeSize <= 100 ? Math.ceil(rangeSize / 20) : Math.ceil(rangeSize / 50)
  }, [range])

  const formatValue = useCallback((value: number) => value.toLocaleString(undefined, { maximumFractionDigits: 0 }), [])

  const onFromInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const numValue = Number(e.target.value)
      if (!Number.isNaN(numValue) && numValue >= range[0] && numValue <= range[1]) column.setFilterValue([numValue, range[1]])
    },
    [column, range]
  )

  const onToInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const numValue = Number(e.target.value)
      if (!Number.isNaN(numValue) && numValue >= range[0] && numValue <= range[1]) column.setFilterValue([range[0], numValue])
    },
    [column, range]
  )

  const onSliderValueChange = useCallback((value: RangeValue) => column.setFilterValue(value), [column])
  const onReset = useCallback(() => column.setFilterValue(undefined), [column])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='border-dashed'>
          {isRangeValue(columnFilterValue) ? (
            <div
              role='button'
              aria-label={`Clear ${title} filter`}
              tabIndex={0}
              className='rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
              onClick={onReset}>
              <XCircleIcon />
            </div>
          ) : (
            <PlusCircleIcon />
          )}
          <span>{title}</span>
          {isRangeValue(columnFilterValue) && (
            <>
              <Separator orientation='vertical' className='mx-0.5 data-[orientation=vertical]:h-4' />
              {formatValue(columnFilterValue[0])} - {formatValue(columnFilterValue[1])}
              {unit ? ` ${unit}` : ''}
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className='flex w-auto flex-col gap-4'>
        <div className='flex flex-col gap-3'>
          <p className='font-medium leading-none'>{title}</p>
          <div className='flex items-center gap-4'>
            <Label htmlFor={`${id}-from`} className='sr-only'>From</Label>
            <div className='relative'>
              <Input
                id={`${id}-from`}
                type='number'
                inputMode='numeric'
                placeholder={range[0].toString()}
                min={range[0]}
                max={range[1]}
                value={range[0]}
                onChange={onFromInputChange} />
              {unit && <span className='absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm'>{unit}</span>}
            </div>
            <Label htmlFor={`${id}-to`} className='sr-only'>To</Label>
            <div className='relative'>
              <Input
                id={`${id}-to`}
                type='number'
                inputMode='numeric'
                placeholder={range[1].toString()}
                min={range[0]}
                max={range[1]}
                value={range[1]}
                onChange={onToInputChange} />
              {unit && <span className='absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm'>{unit}</span>}
            </div>
          </div>
          <Label htmlFor={`${id}-slider`} className='sr-only'>{title} slider</Label>
          <Slider
            id={`${id}-slider`}
            min={range[0]}
            max={range[1]}
            step={step}
            value={range} onValueChange={onSliderValueChange} />
        </div>
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
