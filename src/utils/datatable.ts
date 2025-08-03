import type { Row } from '@tanstack/react-table'

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
