import { enUS } from 'date-fns/locale'
import { useCallback, useMemo } from 'react'
import type { DateRange } from 'react-day-picker'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { TDateFilterProps } from '@/types'
import { dateTimeFormat } from '@/utils'
import { FunnelSimpleIcon, XIcon } from '@phosphor-icons/react'

const parseAsDate = (timestamp: number | string | undefined): Date | undefined => {
  if (!timestamp) return undefined
  const numeric = typeof timestamp === 'string' ? Number(timestamp) : timestamp
  const date = new Date(numeric)
  return isNaN(date.getTime()) ? undefined : date
}

const parseFilterValue = (value: unknown): (number | string | undefined)[] => {
  if (Array.isArray(value)) return value.map((v) => typeof v === 'number' || typeof v === 'string' ? v : undefined)
  if (typeof value === 'string' || typeof value === 'number') return [value]
  return []
}

export const DateFilter = <TData,>({ column, title }: TDateFilterProps<TData>) => {
  const rawValue = column.getFilterValue()

  const selectedRange = useMemo<DateRange>(() => {
    const [fromRaw, toRaw] = parseFilterValue(rawValue)
    return {
      from: parseAsDate(fromRaw),
      to: parseAsDate(toRaw)
    }
  }, [rawValue])

  const handleSelect = useCallback((range: DateRange | undefined) => {
    if (!range) {
      column.setFilterValue(undefined)
      return
    }

    const from = range.from?.getTime()
    const to = range.to?.getTime()
    column.setFilterValue(from || to ? [from, to] : undefined)
  }, [column])

  const handleReset = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    column.setFilterValue(undefined)
  }, [column])

  const hasValue = selectedRange.from || selectedRange.to

  const label = useMemo(() => {
    if (!hasValue) return title

    const formatted =
      selectedRange.from && selectedRange.to
        ? `${dateTimeFormat(selectedRange.from)} - ${dateTimeFormat(selectedRange.to)}`
        : dateTimeFormat(selectedRange.from ?? selectedRange.to!)

    return (
      <span className='flex items-center gap-2'>
        {title}
        <Separator orientation='vertical' className='mx-0.5 data-[orientation=vertical]:h-4' />
        <Badge variant='secondary' className='-mr-2 text-muted-foreground'>
          {formatted}
        </Badge>
      </span>
    )
  }, [hasValue, selectedRange, title])

  const calendarSettings: {
    startMonth: Date | undefined
    endMonth: Date | undefined
    captionLayout: 'dropdown' | 'dropdown-months' | 'dropdown-years' | 'label' | undefined
  } = useMemo(() => {
    const dates = column.getFacetedRowModel()?.rows
      .map((row) => new Date(row.getValue(column.id)))
      .filter((date) => !isNaN(date.getTime()))

    if (!dates?.length) {
      return {
        startMonth: undefined,
        endMonth: undefined,
        captionLayout: 'dropdown'
      }
    }

    const years = dates.map((d) => d.getFullYear())
    const minYear = Math.min(...years)
    const maxYear = Math.max(...years)
    const allSameYear = years.every((y) => y === new Date().getFullYear())

    return {
      startMonth: new Date(minYear, 0),
      endMonth: new Date(maxYear, 11),
      captionLayout: allSameYear ? 'dropdown-months' : 'dropdown'
    }
  }, [column])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='border-dashed'>
          {hasValue ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div tabIndex={0} role='button' onClick={handleReset} aria-label={`Clear ${title} filter`}>
                  <XIcon />
                </div>
              </TooltipTrigger>
              <TooltipContent>Clear filter</TooltipContent>
            </Tooltip>
          ) : (
            <FunnelSimpleIcon />
          )}
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='range'
          locale={enUS}
          captionLayout={calendarSettings.captionLayout}
          startMonth={calendarSettings.startMonth}
          selected={selectedRange}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  )
}
