import type { FilterFn } from '@tanstack/react-table'

export const numberRangeFilterFn: FilterFn<any> = (
  row,
  columnId,
  range: [number | undefined, number | undefined],
) => {
  const value = row.getValue<number>(columnId)
  if (!Number.isFinite(value)) return false

  const [min, max] = range
  if (min != null && value < min) return false
  if (max != null && value > max) return false
  return true
}

export const dateRangeFilterFn: FilterFn<any> = (
  row,
  columnId,
  filterValue: [number | undefined, number | undefined],
) => {
  const rowDateValue = row.getValue<Date | string | number | null | undefined>(columnId)
  if (!rowDateValue) return false

  const rowDateTime = new Date(rowDateValue as string | number | Date).getTime()
  if (isNaN(rowDateTime)) return false

  const [from, to] = filterValue

  if (typeof from === 'number' && rowDateTime < from) {
    return false
  }

  if (typeof to === 'number') {
    const endOfDay = new Date(to)
    endOfDay.setHours(23, 59, 59, 999)
    if (rowDateTime > endOfDay.getTime()) {
      return false
    }
  }

  return true
}

export const getNumberRange = <T extends Record<string, any>>(
  items: T[],
  key: keyof T,
): [number, number] => {
  if (items.length === 0) return [0, 0]

  const numbers = items
    .map((item) => Number(item[key]))
    .filter((num) => Number.isFinite(num))

  if (numbers.length === 0) return [0, 0]

  return [Math.min(...numbers), Math.max(...numbers)]
}
