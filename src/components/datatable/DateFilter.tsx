import {
  CalendarIcon,
  XCircleIcon
} from '@phosphor-icons/react'
import type { Column } from '@tanstack/react-table'
import {
  useCallback,
  useMemo
} from 'react'
import type { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/lib/format'

type DateSelection = Date[] | DateRange

const isDateRange = (value: DateSelection): value is DateRange =>
  value && typeof value === 'object' && !Array.isArray(value)

const parseDate = (timestamp: number | string | undefined): Date | undefined => {
  if (!timestamp) return undefined
  const numeric = typeof timestamp === 'string' ? Number(timestamp) : timestamp
  const date = new Date(numeric)
  return !Number.isNaN(date.getTime()) ? date : undefined
}

const parseFilterValue = (value: unknown) => {
  if (value === null || value === undefined) return []
  if (Array.isArray(value)) return value.map(item => (typeof item === 'string' || typeof item === 'number' ? item : undefined))
  if (typeof value === 'string' || typeof value === 'number') return [value]
  return []
}

interface DateFilterProps<TData> {
  column: Column<TData, unknown>
  title?: string
  multiple?: boolean
}

export const DateFilter = <TData,>({ column, title, multiple }: DateFilterProps<TData>) => {
  const columnFilterValue = column.getFilterValue()

  const selectedDates = useMemo<DateSelection>(() => {
    if (!columnFilterValue) return multiple ? { from: undefined, to: undefined } : []

    const timestamps = parseFilterValue(columnFilterValue)

    if (multiple) {
      return {
        from: parseDate(timestamps[0]),
        to: parseDate(timestamps[1])
      }
    }

    const date = parseDate(timestamps[0])
    return date ? [date] : []
  }, [columnFilterValue, multiple])

  const onSelect = useCallback(
    (date: Date | DateRange | undefined) => {
      if (!date) return column.setFilterValue(undefined)
      if (multiple && !('getTime' in date)) {
        const from = date.from?.getTime()
        const to = date.to?.getTime()
        column.setFilterValue(from || to ? [from, to] : undefined)
      } else if (!multiple && 'getTime' in date) {
        column.setFilterValue(date.getTime())
      }
    },
    [column, multiple]
  )

  const onReset = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    column.setFilterValue(undefined)
  }, [column])

  const hasValue = useMemo(() => {
    if (multiple) return isDateRange(selectedDates) ? selectedDates.from || selectedDates.to : false
    return Array.isArray(selectedDates) && selectedDates.length > 0
  }, [multiple, selectedDates])

  const formatRange = useCallback((range: DateRange) => {
    if (!range.from && !range.to) return ''
    if (range.from && range.to) return `${formatDate(range.from)} - ${formatDate(range.to)}`
    return formatDate(range.from ?? range.to)
  }, [])

  const label = useMemo(() => {
    if (multiple) {
      if (!isDateRange(selectedDates)) return null
      const text = selectedDates.from || selectedDates.to ? formatRange(selectedDates) : 'Select date range'
      return (
        <span className='flex items-center gap-2'>
          <span>{title}</span>
          {(selectedDates.from || selectedDates.to) && (
            <>
              <Separator orientation='vertical' className='mx-0.5 data-[orientation=vertical]:h-4' />
              <span>{text}</span>
            </>
          )}
        </span>
      )
    }

    if (isDateRange(selectedDates)) return null
    const text = selectedDates.length > 0 ? formatDate(selectedDates[0]) : 'Select date'
    return (
      <span className='flex items-center gap-2'>
        <span>{title}</span>
        {selectedDates.length > 0 && (
          <>
            <Separator orientation='vertical' className='mx-0.5 data-[orientation=vertical]:h-4' />
            <span>{text}</span>
          </>
        )}
      </span>
    )
  }, [selectedDates, multiple, formatRange, title])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='border-dashed'>
          {hasValue ? (
            <div
              role='button'
              aria-label={`Clear ${title} filter`}
              tabIndex={0}
              onClick={onReset}
              className='rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'>
              <XCircleIcon />
            </div>
          ) : (
            <CalendarIcon />
          )}
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        {multiple ? (
          <Calendar
            captionLayout='dropdown'
            mode='range'
            selected={isDateRange(selectedDates) ? selectedDates : { from: undefined, to: undefined }}
            onSelect={onSelect}
          />
        ) : (
          <Calendar
            captionLayout='dropdown'
            mode='single'
            selected={!isDateRange(selectedDates) ? selectedDates[0] : undefined}
            onSelect={onSelect}
          />
        )}
      </PopoverContent>
    </Popover>
  )
}
