import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/libs/format'
import { FunnelSimpleIcon, XIcon } from '@phosphor-icons/react'
import type { Column } from '@tanstack/react-table'
import { useMemo, useState, type MouseEvent } from 'react'
import type { DateRange } from 'react-day-picker'

interface DateFilterProps<TData> {
  column: Column<TData, unknown>
  title: string
  mode?: 'single' | 'range'
}

const isDate = (value: unknown): value is Date =>
  value instanceof Date && !isNaN(value.getTime())

const isDateRange = (value: unknown): value is DateRange =>
  typeof value === 'object' && value !== null && ('from' in value || 'to' in value)

const parseDate = (value: unknown): Date | undefined => {
  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value)
    return isNaN(date.getTime()) ? undefined : date
  }
  return undefined
}

export const DateFilter = <TData,>({
  column,
  title,
  mode = 'single',
}: DateFilterProps<TData>) => {
  const [open, setOpen] = useState(false)

  const selectedValue = useMemo(() => {
    const filterValue = column.getFilterValue()
    if (mode === 'range' && Array.isArray(filterValue)) {
      return { from: parseDate(filterValue[0]), to: parseDate(filterValue[1]) }
    }
    if (mode === 'single' && !Array.isArray(filterValue)) {
      return parseDate(filterValue)
    }
    return undefined
  }, [column, mode])

  const handleSelect = (date: Date | DateRange | undefined) => {
    if (mode === 'range' && isDateRange(date)) {
      const from = date.from?.getTime()
      const to = date.to?.getTime()
      column.setFilterValue(from || to ? [from, to] : undefined)
    } else if (mode === 'single' && isDate(date)) {
      column.setFilterValue(date.getTime())
    } else {
      column.setFilterValue(undefined)
    }
    setOpen(false)
  }

  const handleClear = (event: MouseEvent) => {
    event.stopPropagation()
    column.setFilterValue(undefined)
    setOpen(false)
  }

  const formatLabel = () => {
    if (!selectedValue) return title

    if (isDateRange(selectedValue)) {
      if (selectedValue.from && selectedValue.to) {
        return `${formatDate(selectedValue.from)} - ${formatDate(selectedValue.to)}`
      }
      if (selectedValue.from) return `From ${formatDate(selectedValue.from)}`
      if (selectedValue.to) return `Until ${formatDate(selectedValue.to)}`
      return title
    }
    if (isDate(selectedValue)) return formatDate(selectedValue)
    return title
  }

  const hasValue = isDateRange(selectedValue)
    ? selectedValue.from || selectedValue.to
    : isDate(selectedValue)

  const label = formatLabel()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 border-dashed'>
          {hasValue ? (
            <div
              role='button'
              aria-label={`Clear ${title} filter`}
              tabIndex={0}
              onClick={handleClear}>
              <XIcon />
            </div>
          ) : (
            <FunnelSimpleIcon />
          )}
          <span>{title}</span>
          {hasValue && (
            <>
              <Separator orientation='vertical' className='data-[orientation=vertical]:h-4' />
              <Badge variant='secondary' className='rounded-sm px-1 font-normal'>
                {label}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className='w-auto p-0'>
        {mode === 'range' ? (
          <Calendar
            mode='range'
            captionLayout='dropdown'
            required={false}
            selected={isDateRange(selectedValue) ? selectedValue : undefined}
            onSelect={handleSelect}
          />
        ) : (
          <Calendar
            mode='single'
            captionLayout='dropdown'
            selected={isDate(selectedValue) ? selectedValue : undefined}
            onSelect={handleSelect}
          />
        )}
      </PopoverContent>
    </Popover>
  )
}
