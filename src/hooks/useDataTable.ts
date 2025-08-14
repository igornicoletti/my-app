'use client'

import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type TableOptions,
  type TableState,
  type Updater,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table'
import {
  useCallback,
  useMemo,
  useState
} from 'react'

import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import type { ExtendedColumnSort } from '@/types/datatable'

const DEBOUNCE_MS = 300

interface UseDataTableProps<TData>
  extends Omit<
    TableOptions<TData>,
    | 'state'
    | 'pageCount'
    | 'getCoreRowModel'
    | 'manualFiltering'
    | 'manualPagination'
    | 'manualSorting'
  > {
  initialState?: Omit<Partial<TableState>, 'sorting'> & {
    sorting?: ExtendedColumnSort<TData>[]
  }
  debounceMs?: number
  enableAdvancedFilter?: boolean
}

export const useDataTable = <TData>(props: UseDataTableProps<TData>) => {
  const {
    columns,
    initialState,
    debounceMs = DEBOUNCE_MS,
    enableAdvancedFilter = false,
    ...tableProps
  } = props

  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    initialState?.rowSelection ?? {}
  )
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialState?.columnVisibility ?? {}
  )
  const [pagination, setPagination] = useState<PaginationState>(
    initialState?.pagination ?? { pageIndex: 0, pageSize: 10 }
  )
  const [sorting, setSorting] = useState<SortingState>(
    initialState?.sorting ?? []
  )

  const filterableColumns = useMemo(() => {
    if (enableAdvancedFilter) return []
    return columns.filter((column) => column.enableColumnFilter)
  }, [columns, enableAdvancedFilter])

  const initialFiltersState = initialState?.columnFilters
  const initialColumnFilters: ColumnFiltersState = useMemo(() => {
    if (enableAdvancedFilter) return []

    const initialFilters: ColumnFiltersState = []
    for (const column of filterableColumns) {
      if (column.id && initialFiltersState) {
        const filter = initialFiltersState.find((f) => f.id === column.id)
        if (filter) {
          initialFilters.push(filter)
        }
      }
    }
    return initialFilters
  }, [filterableColumns, enableAdvancedFilter, initialFiltersState])

  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(initialColumnFilters)

  const debouncedSetColumnFilters = useDebouncedCallback(
    (updaterOrValue: Updater<ColumnFiltersState>) => {
      setColumnFilters((prev) =>
        typeof updaterOrValue === 'function'
          ? updaterOrValue(prev)
          : updaterOrValue
      )
    },
    debounceMs
  )

  const onColumnFiltersChange = useCallback(
    (updaterOrValue: Updater<ColumnFiltersState>) => {
      if (enableAdvancedFilter) return
      debouncedSetColumnFilters(updaterOrValue)
      setPagination((prev) => ({ ...prev, pageIndex: 0 }))
    },
    [debouncedSetColumnFilters, enableAdvancedFilter]
  )

  const table = useReactTable({
    ...tableProps,
    columns,
    initialState,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    defaultColumn: {
      ...tableProps.defaultColumn,
      enableColumnFilter: false,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    manualPagination: false,
    manualSorting: false,
    manualFiltering: false,
  })

  return { table, debounceMs }
}
