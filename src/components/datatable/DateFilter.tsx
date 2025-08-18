import { CalendarIcon, XCircleIcon } from '@phosphor-icons/react'
import type { Column } from '@tanstack/react-table'
import { useCallback, useMemo, type MouseEvent } from 'react'
import type { DateRange } from 'react-day-picker'

import { Badge } from '@/components/ui'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/lib/format'

const isDateRange = (value: unknown): value is DateRange => {
  return value ? typeof value === 'object' && value !== null && 'from' in value : false
}

const parseDateFromTimestamp = (timestamp: unknown): Date | undefined => {
  if (typeof timestamp !== 'number' && typeof timestamp !== 'string') return undefined
  const numericTimestamp = Number(timestamp)
  const date = new Date(numericTimestamp)
  return isNaN(date.getTime()) ? undefined : date
}

interface DateFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  multiple?: boolean
}

export const DateFilter = <TData, TValue>({
  column,
  title,
  multiple
}: DateFilterProps<TData, TValue>) => {
  const columnFilterValue = column?.getFilterValue()

  const selectedValue = useMemo(() => {
    if (!columnFilterValue) {
      return multiple ? { from: undefined, to: undefined } : undefined
    }
    if (multiple && Array.isArray(columnFilterValue)) {
      const [from, to] = columnFilterValue
      return { from: parseDateFromTimestamp(from), to: parseDateFromTimestamp(to) }
    }
    if (!multiple && !Array.isArray(columnFilterValue)) {
      return parseDateFromTimestamp(columnFilterValue)
    }
    return undefined
  }, [columnFilterValue, multiple])

  const handleSingleSelect = useCallback((day: Date | undefined) => {
    column?.setFilterValue(day ? day.getTime() : undefined)
  }, [column])

  const handleRangeSelect = useCallback((range: DateRange | undefined) => {
    const from = range?.from?.getTime()
    const to = range?.to?.getTime()
    column?.setFilterValue(from || to ? [from, to] : undefined)
  }, [column])

  const onReset = useCallback((event: MouseEvent) => {
    event.stopPropagation()
    column?.setFilterValue(undefined)
  }, [column])

  const hasValue = useMemo(() => {
    if (multiple && isDateRange(selectedValue)) {
      return !!(selectedValue.from || selectedValue.to)
    }
    return !multiple && selectedValue instanceof Date
  }, [multiple, selectedValue])

  const displayLabel = useMemo(() => {
    if (multiple && isDateRange(selectedValue) && (selectedValue.from || selectedValue.to)) {
      if (selectedValue.from && selectedValue.to) {
        return `${formatDate(selectedValue.from)} - ${formatDate(selectedValue.to)}`
      }
      return formatDate(selectedValue.from ?? selectedValue.to)
    }
    if (!multiple && selectedValue instanceof Date) {
      return formatDate(selectedValue)
    }
    return null
  }, [multiple, selectedValue])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='border-dashed'>
          {hasValue ? (
            <div
              tabIndex={0}
              role='button'
              aria-label={`Clear ${title} filter`}
              onClick={onReset}>
              <XCircleIcon />
            </div>
          ) : (
            <CalendarIcon />
          )}
          <span>{title}</span>
          {displayLabel && (
            <>
              <Separator orientation='vertical' className='mx-0.5 data-[orientation=vertical]:h-4' />
              <Badge variant='secondary' className='rounded-sm px-1 font-normal'>
                {displayLabel}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        {multiple ? (
          <Calendar
            captionLayout='dropdown'
            mode='range'
            selected={isDateRange(selectedValue) ? selectedValue : undefined}
            onSelect={handleRangeSelect}
          />
        ) : (
          <Calendar
            captionLayout='dropdown'
            mode='single'
            selected={selectedValue instanceof Date ? selectedValue : undefined}
            onSelect={handleSingleSelect}
          />
        )}
      </PopoverContent>
    </Popover>
  )
}
