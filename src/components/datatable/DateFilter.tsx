import {
  CalendarBlankIcon,
  XCircleIcon
} from '@phosphor-icons/react'
import {
  useCallback,
  useMemo,
  type MouseEvent
} from 'react'
import type { DateRange } from 'react-day-picker'

import { Badge } from '@/components/ui'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/lib/format'
import type { DataTableDateFilter } from '@/types/datatable'

type DateSelection = Date[] | DateRange

const getIsDateRange = (value: DateSelection): value is DateRange =>
  value && typeof value === 'object' && !Array.isArray(value)

const parseAsDate = (timestamp: number | string | undefined): Date | undefined => {
  if (!timestamp) return undefined
  const numericTimestamp = typeof timestamp === 'string' ? Number(timestamp) : timestamp
  const date = new Date(numericTimestamp)
  return !Number.isNaN(date.getTime()) ? date : undefined
}

const parseColumnFilterValue = (value: unknown) => {
  if (value === null || value === undefined) return []

  if (Array.isArray(value)) {
    return value.map((item) => (typeof item === 'number' || typeof item === 'string' ? item : undefined))
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return [value]
  }

  return []
}

export const DateFilter = <TData,>({
  column,
  title,
  multiple }: DataTableDateFilter<TData>) => {
  const columnFilterValue = column.getFilterValue()

  const selectedDates = useMemo<DateSelection>(() => {
    if (!columnFilterValue) return multiple ? { from: undefined, to: undefined } : []

    if (multiple) {
      const timestamps = parseColumnFilterValue(columnFilterValue)
      return {
        from: parseAsDate(timestamps[0]),
        to: parseAsDate(timestamps[1]),
      }
    }

    const timestamps = parseColumnFilterValue(columnFilterValue)
    const date = parseAsDate(timestamps[0])
    return date ? [date] : []
  }, [columnFilterValue, multiple])

  const onSelect = useCallback((date: Date | DateRange | undefined) => {
    if (!date) {
      column.setFilterValue(undefined)
      return
    }

    if (multiple) {
      if (!('getTime' in date)) {
        const from = date.from?.getTime()
        const to = date.to?.getTime()
        column.setFilterValue(from || to ? [from, to] : undefined)
      }
    } else {
      if ('getTime' in date) {
        column.setFilterValue(date.getTime())
      }
    }
  }, [column, multiple])

  const onReset = useCallback((event: MouseEvent) => {
    event.stopPropagation()
    column.setFilterValue(undefined)
  }, [column])

  const hasValue = useMemo(() => {
    if (multiple) {
      if (!getIsDateRange(selectedDates)) return false
      return selectedDates.from || selectedDates.to
    }

    if (!Array.isArray(selectedDates)) return false
    return selectedDates.length > 0
  }, [multiple, selectedDates])

  const formatDateRange = useCallback((range: DateRange) => {
    if (!range.from && !range.to) return ''
    if (range.from && range.to) return `${formatDate(range.from)} - ${formatDate(range.to)}`
    return formatDate(range.from ?? range.to)
  }, [])

  const label = useMemo(() => {
    if (multiple) {
      if (!getIsDateRange(selectedDates)) return null

      const hasSelectedDates = selectedDates.from || selectedDates.to
      const dateText = hasSelectedDates ? formatDateRange(selectedDates) : 'Select date range'

      return (
        <div className='flex items-center gap-2'>
          {title && <span>{title}</span>}
          {hasSelectedDates && (
            <>
              <Separator
                orientation='vertical'
                className='mx-0.5 data-[orientation=vertical]:h-4' />
              <Badge variant='secondary'>
                {dateText}
              </Badge>
            </>
          )}
        </div>
      )
    }

    if (getIsDateRange(selectedDates)) return null

    const hasSelectedDate = selectedDates.length > 0
    const dateText = hasSelectedDate ? formatDate(selectedDates[0]) : 'Select date'

    return (
      <div className='flex items-center gap-2'>
        {title && <span>{title}</span>}
        {hasSelectedDate && (
          <>
            <Separator
              orientation='vertical'
              className='mx-0.5 data-[orientation=vertical]:h-4' />
            <Badge variant='secondary'>
              {dateText}
            </Badge>
          </>
        )}
      </div>
    )
  }, [selectedDates, multiple, formatDateRange, title])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='border-dashed'>
          {hasValue ? (
            <div
              tabIndex={0}
              onClick={onReset}
              aria-label={`Clear ${title} filter`}
              role='button'>
              <XCircleIcon />
            </div>
          ) : (
            <CalendarBlankIcon />
          )}
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        {multiple ? (
          <Calendar
            captionLayout='dropdown'
            mode='range'
            selected={getIsDateRange(selectedDates) ? selectedDates : { from: undefined, to: undefined }}
            onSelect={onSelect}
          />
        ) : (
          <Calendar
            captionLayout='dropdown'
            mode='single'
            selected={!getIsDateRange(selectedDates) ? selectedDates[0] : undefined}
            onSelect={onSelect}
          />
        )}
      </PopoverContent>
    </Popover>
  )
}
