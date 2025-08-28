import type { TaskSchema } from '@/features/app/tasks/lib/types'
import type { FilterFn } from '@tanstack/react-table'

export const rangeFilter: FilterFn<TaskSchema> = (
  row,
  columnId,
  range: [number | undefined, number | undefined],
) => {
  const value = row.getValue<number>(columnId)
  if (typeof value !== 'number') return false

  const [min, max] = range
  if (min != null && value < min) return false
  if (max != null && value > max) return false

  return true
}

export const dateRangeFilter: FilterFn<TaskSchema> = (
  row,
  columnId,
  value: [Date?, Date?],
) => {
  const rowDate = row.getValue<Date>(columnId)
  if (!rowDate) return false

  const [from, to] = value
  if (from && rowDate < from) return false
  if (to) {
    const endOfDay = new Date(to)
    endOfDay.setHours(23, 59, 59, 999)
    if (rowDate > endOfDay) return false
  }
  return true
}
