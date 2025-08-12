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
  type Updater,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table'
import { useState } from 'react'

import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'

interface UseDataTableProps<TData>
  extends Omit<
    TableOptions<TData>,
    | 'state'
    | 'pageCount'
    | 'getCoreRowModel'
    | 'manualFiltering'
    | 'manualPagination'
    | 'manualSorting'> {
  pageCount?: number
  initialState?: Partial<{
    sorting: SortingState
    pagination: PaginationState
    rowSelection: RowSelectionState
    columnVisibility: VisibilityState
    columnFilters: ColumnFiltersState
  }>
  debounceMs?: number
}

export const useDataTable = <TData,>(props: UseDataTableProps<TData>) => {
  const {
    columns,
    pageCount,
    initialState,
    debounceMs = 300,
    ...tableProps
  } = props

  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    initialState?.rowSelection ?? {}
  )
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialState?.columnVisibility ?? {}
  )
  const [sorting, setSorting] = useState<SortingState>(
    initialState?.sorting ?? []
  )
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialState?.pagination?.pageIndex ?? 0,
    pageSize: initialState?.pagination?.pageSize ?? 10,
  })

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    initialState?.columnFilters ?? []
  )

  const setDebouncedColumnFilters = useDebouncedCallback(
    (updater: Updater<ColumnFiltersState>) => {
      setColumnFilters(updater)
      setPagination(prev => ({ ...prev, pageIndex: 0 }))
    },
    debounceMs
  )

  return useReactTable({
    ...tableProps,
    columns,
    pageCount,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    defaultColumn: {
      ...tableProps.defaultColumn,
      enableColumnFilter: true,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setDebouncedColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  })
}
