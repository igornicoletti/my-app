import type { Column } from '@tanstack/react-table'
import type { CSSProperties } from 'react'

import { dataTableConfig } from '@/config/datatable'
import type {
  ExtendedColumnFilter,
  FilterOperator,
  FilterVariant
} from '@/types/datatable'

export const getCommonPinningStyles = <TData>({
  column,
  withBorder = false,
}: {
  column: Column<TData>
  withBorder?: boolean
}): CSSProperties => {
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

export const getFilterOperators = (filterVariant: FilterVariant) => {
  const operatorMap: Record<FilterVariant, { label: string; value: FilterOperator }[]> = {
    text: dataTableConfig.textOperators,
    number: dataTableConfig.numericOperators,
    range: dataTableConfig.numericOperators,
    date: dataTableConfig.dateOperators,
    dateRange: dataTableConfig.dateOperators,
    boolean: dataTableConfig.booleanOperators,
    select: dataTableConfig.selectOperators,
    multiSelect: dataTableConfig.multiSelectOperators,
  }

  return operatorMap[filterVariant] ?? dataTableConfig.textOperators
}

export const getDefaultFilterOperator = (filterVariant: FilterVariant): FilterOperator => {
  const operators = getFilterOperators(filterVariant)
  return operators[0]?.value ?? (filterVariant === 'text' ? 'iLike' : 'eq')
}

export const getValidFilters = <TData>(filters: ExtendedColumnFilter<TData>[]): ExtendedColumnFilter<TData>[] =>
  filters.filter(
    (filter) =>
      filter.operator === 'isEmpty' ||
      filter.operator === 'isNotEmpty' ||
      (Array.isArray(filter.value)
        ? filter.value.length > 0
        : filter.value !== '' && filter.value !== null && filter.value !== undefined),
  )
