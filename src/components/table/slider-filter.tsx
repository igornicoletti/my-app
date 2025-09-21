import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { FunnelSimpleIcon, XIcon } from '@phosphor-icons/react'
import type { Column } from '@tanstack/react-table'
import { useId, useMemo, type MouseEvent } from 'react'

type RangeValue = [number, number]

const getIsValidRange = (value: unknown): value is RangeValue =>
  Array.isArray(value) && value.length === 2 && typeof value[0] === 'number' && typeof value[1] === 'number'

const useRange = (column: Column<any, unknown>) => {
  return useMemo(() => {
    const defaultRange = column.columnDef.meta?.range
    let min = 0
    let max = 100

    if (getIsValidRange(defaultRange)) {
      [min, max] = defaultRange
    } else {
      const facetedMinMax = column.getFacetedMinMaxValues()
      if (facetedMinMax && getIsValidRange(facetedMinMax)) {
        [min, max] = facetedMinMax
      }
    }

    const rangeSize = max - min
    const step = rangeSize <= 20 ? 1 : rangeSize <= 100 ? Math.ceil(rangeSize / 20) : Math.ceil(rangeSize / 50)

    return { min, max, step }
  }, [column])
}

interface FilterTriggerProps {
  title: string
  unit?: string
  value?: RangeValue
  onReset: (event: MouseEvent) => void
}

const FilterTrigger = ({ title, unit, value, onReset }: FilterTriggerProps) => (
  <Button variant='outline' size='sm' className='h-8 border-dashed'>
    {value ? (
      <div role='button' aria-label={`Clear ${title} filter`} tabIndex={0} onClick={onReset}>
        <XIcon />
      </div>
    ) : (
      <FunnelSimpleIcon />
    )}
    <span>{title}</span>
    {value && (
      <>
        <Separator orientation='vertical' className='mx-0.5 data-[orientation=vertical]:h-4' />
        <Badge variant='secondary' className='rounded-sm px-1 font-normal'>
          {`${value[0]} - ${value[1]}${unit ? ` ${unit}` : ''}`}
        </Badge>
      </>
    )}
  </Button>
)

interface FilterContentProps {
  id: string
  title: string
  unit?: string
  range: RangeValue
  min: number
  max: number
  step: number
  onRangeChange: (newRange: RangeValue) => void
}

const FilterContent = ({ id, title, range, min, max, step, onRangeChange }: FilterContentProps) => (
  <>
    <div className='flex items-center gap-4'>
      {[
        { id: `${id}-from`, value: range[0], handler: (v: number) => onRangeChange([v, range[1]]) },
        { id: `${id}-to`, value: range[1], handler: (v: number) => onRangeChange([range[0], v]) },
      ].map((input) => (
        <div key={input.id} className='relative'>
          <Label htmlFor={input.id} className='sr-only'>
            {input.id.includes('from') ? 'From' : 'To'}
          </Label>
          <Input
            id={input.id}
            type='number'
            inputMode='numeric'
            value={input.value}
            min={min}
            max={max}
            onChange={(e) => input.handler(Number(e.target.value))}
            className='h-8 w-24'
          />
        </div>
      ))}
    </div>
    <Label htmlFor={`${id}-slider`} className='sr-only'>{`${title} slider`}</Label>
    <Slider id={`${id}-slider`} min={min} max={max} step={step} value={range} onValueChange={(val) => onRangeChange(val as RangeValue)} />
  </>
)

interface SliderFilterProps<TData> {
  column: Column<TData, unknown>
  title: string
}

export const SliderFilter = <TData,>({ column, title }: SliderFilterProps<TData>) => {
  const id = useId()
  const { min, max, step } = useRange(column)
  const unit = column.columnDef.meta?.unit

  const columnFilterValue = column.getFilterValue()
  const value = getIsValidRange(columnFilterValue) ? columnFilterValue : undefined
  const range = value ?? [min, max]

  const handleRangeChange = (newRange: RangeValue) => {
    column.setFilterValue(newRange)
  }

  const handleReset = (event: MouseEvent) => {
    event.stopPropagation()
    column.setFilterValue(undefined)
  }

  return (
    <Popover>
      <PopoverTrigger>
        <FilterTrigger title={title} unit={unit} value={value} onReset={handleReset} />
      </PopoverTrigger>
      <PopoverContent className='w-auto space-y-4'>
        <FilterContent id={id} title={title} unit={unit} range={range} min={min} max={max} step={step} onRangeChange={handleRangeChange} />
      </PopoverContent>
    </Popover>
  )
}
