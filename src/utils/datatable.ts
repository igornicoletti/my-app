import type { Column, Row } from '@tanstack/react-table'

export const multiSelectFilter = <TData>(row: Row<TData>, columnId: string, filterValue: string[]) => {
  const value = row.getValue<string>(columnId)
  return Array.isArray(filterValue) ? filterValue.includes(value) : true
}

export const dateRangeFilter = <TData>(row: Row<TData>, columnId: string, filterValue: [number?, number?]) => {
  const raw = row.getValue<string | number | Date>(columnId)
  const date = new Date(raw)

  if (isNaN(date.getTime())) return false

  const time = date.getTime()
  const [from, to] = filterValue

  if (from && to) return time >= from && time <= to
  if (from) return time >= from
  if (to) return time <= to

  return true
}

export const dateTimeFormat = (date: Date | string | number | undefined, opts: Intl.DateTimeFormatOptions = {}) => {
  if (!date) return ''

  try {
    const formatted = new Intl.DateTimeFormat('en-US', {
      month: opts.month ?? 'long',
      day: opts.day ?? 'numeric',
      year: opts.year ?? 'numeric',
      ...opts,
    }).format(new Date(date))

    return formatted.charAt(0).toUpperCase() + formatted.slice(1)
  } catch {
    return ''
  }
}

export const getCommonPinningStyles = <TData,>({ column, withBorder = false }: { column: Column<TData>, withBorder?: boolean }): React.CSSProperties => {
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right')

  return {
    boxShadow: withBorder
      ? isLastLeftPinnedColumn
        ? '-4px 0 4px -4px var(--border) inset'
        : isFirstRightPinnedColumn
          ? '4px 0 4px -4px var(--border) inset'
          : undefined
      : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 0.97 : 1,
    position: isPinned ? 'sticky' : 'relative',
    background: 'var(--background)',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  }
}
