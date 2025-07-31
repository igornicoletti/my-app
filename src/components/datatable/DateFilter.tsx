import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/features'
import type { TDateFilterProps } from '@/types'
import { CalendarIcon, XCircleIcon } from '@phosphor-icons/react'
import { useCallback, useMemo } from 'react'
import type { DateRange } from 'react-day-picker'

type DateSelection = Date[] | DateRange

const getIsDateRange = (value: DateSelection): value is DateRange => {
  return value && typeof value === 'object' && !Array.isArray(value)
}

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
  if (typeof value === 'string' || typeof value === 'number') return [value]
  return []
}

export const DateFilter = <TData,>({ column, title, multiple }: TDateFilterProps<TData>) => {
  const columnFilterValue = column.getFilterValue()

  const selectedDates = useMemo<DateSelection>(() => {
    if (!columnFilterValue) {
      return multiple ? { from: undefined, to: undefined } : []
    }

    if (multiple) {
      const timestamps = parseColumnFilterValue(columnFilterValue)
      return { from: parseAsDate(timestamps[0]), to: parseAsDate(timestamps[1]) }
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

    if (multiple && !('getTime' in date)) {
      const from = date.from?.getTime()
      const to = date.to?.getTime()
      column.setFilterValue(from || to ? [from, to] : undefined)
    } else if (!multiple && 'getTime' in date) {
      column.setFilterValue(date.getTime())
    }
  }, [column, multiple])

  const onReset = useCallback((event: React.MouseEvent) => {
    event.stopPropagation()
    column.setFilterValue(undefined)
  }, [column])

  const hasValue = useMemo(() => {
    if (multiple) {
      if (!getIsDateRange(selectedDates)) return false
      return !!(selectedDates.from || selectedDates.to)
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
    let selectedText = ''

    if (multiple && getIsDateRange(selectedDates)) {
      selectedText = formatDateRange(selectedDates)
    } else if (!multiple && Array.isArray(selectedDates) && selectedDates[0]) {
      selectedText = formatDate(selectedDates[0])
    }

    return (
      <span className='flex items-center gap-2'>
        <span>{title}</span>
        {selectedText && (
          <>
            <Separator orientation='vertical' className='mx-0.5 data-[orientation=vertical]:h-4' />
            <span>{selectedText}</span>
          </>
        )}
      </span>
    )
  }, [selectedDates, multiple, formatDateRange, title])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 border-dashed'>
          {hasValue ? (
            <div
              role='button'
              aria-label={`Clear ${title} filter`}
              tabIndex={0}
              onClick={onReset}
              className='mr-1 rounded-sm opacity-70 transition-opacity hover:opacity-100'>
              <XCircleIcon className='h-4 w-4' />
            </div>
          ) : (
            <CalendarIcon className='mr-2 h-4 w-4' />
          )}
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        {multiple ? (
          <Calendar
            captionLayout='dropdown'
            mode='range'
            onSelect={onSelect}
            selected={getIsDateRange(selectedDates)
              ? selectedDates
              : { from: undefined, to: undefined }}
          />
        ) : (
          <Calendar
            captionLayout='dropdown'
            mode='single'
            onSelect={onSelect}
            selected={!getIsDateRange(selectedDates)
              ? selectedDates[0]
              : undefined}
          />
        )}
      </PopoverContent>
    </Popover>
  )
}
