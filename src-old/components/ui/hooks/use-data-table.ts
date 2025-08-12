"use client"

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
} from "@tanstack/react-table"
import * as React from "react"

import { useDebouncedCallback } from '@/hooks/use-debounced-callback'
import type { ExtendedColumnSort } from "@/types/data-table"

const DEBOUNCE_MS = 300
const THROTTLE_MS = 50

interface UseDataTableProps<TData>
  extends Omit<
    TableOptions<TData>,
    | "state"
    | "pageCount"
    | "getCoreRowModel"
    | "manualFiltering"
    | "manualPagination"
    | "manualSorting"
  >,
  Required<Pick<TableOptions<TData>, "pageCount">> {
  initialState?: Omit<Partial<TableState>, "sorting"> & {
    sorting?: ExtendedColumnSort<TData>[]
  }
  debounceMs?: number
  throttleMs?: number
  clearOnDefault?: boolean
  enableAdvancedFilter?: boolean
  scroll?: boolean
  shallow?: boolean
  startTransition?: React.TransitionStartFunction
}

export function useDataTable<TData>(props: UseDataTableProps<TData>) {
  const {
    columns,
    pageCount = -1,
    initialState,
    debounceMs = DEBOUNCE_MS,
    throttleMs = THROTTLE_MS,
    clearOnDefault = false,
    enableAdvancedFilter = false,
    scroll = false,
    shallow = true,
    startTransition,
    ...tableProps
  } = props

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
    initialState?.rowSelection ?? {},
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(initialState?.columnVisibility ?? {})

  const [page, setPage] = React.useState(
    initialState?.pagination?.pageIndex ?? 0,
  )
  const [perPage, setPerPage] = React.useState(
    initialState?.pagination?.pageSize ?? 10,
  )

  const pagination: PaginationState = React.useMemo(() => {
    return {
      pageIndex: page,
      pageSize: perPage,
    }
  }, [page, perPage])

  const onPaginationChange = React.useCallback(
    (updaterOrValue: Updater<PaginationState>) => {
      if (typeof updaterOrValue === "function") {
        const newPagination = updaterOrValue(pagination)
        setPage(newPagination.pageIndex)
        setPerPage(newPagination.pageSize)
      } else {
        setPage(updaterOrValue.pageIndex)
        setPerPage(updaterOrValue.pageSize)
      }
    },
    [pagination],
  )

  const [sorting, setSorting] = React.useState<SortingState>(
    initialState?.sorting ?? [],
  )

  const onSortingChange = React.useCallback(
    (updaterOrValue: Updater<SortingState>) => {
      if (typeof updaterOrValue === "function") {
        const newSorting = updaterOrValue(sorting)
        setSorting(newSorting)
      } else {
        setSorting(updaterOrValue)
      }
    },
    [sorting],
  )

  const filterableColumns = React.useMemo(() => {
    if (enableAdvancedFilter) return []

    return columns.filter((column) => column.enableColumnFilter)
  }, [columns, enableAdvancedFilter])

  // Simple filter state, keyed by column id, values string or string[]
  const [filterValues, setFilterValues] = React.useState<Record<string, string | string[]>>(
    {},
  )

  // Debounced setter for filters, resets page to 0 on change
  const debouncedSetFilterValues = useDebouncedCallback(
    (values: Record<string, string | string[]>) => {
      setPage(0)
      setFilterValues(values)
    },
    debounceMs,
  )

  const initialColumnFilters: ColumnFiltersState = React.useMemo(() => {
    return Object.entries(filterValues).reduce<ColumnFiltersState>(
      (filters, [key, value]) => {
        if (value !== null && value !== undefined) {
          const processedValue = Array.isArray(value)
            ? value
            : typeof value === "string" && /[^a-zA-Z0-9]/.test(value)
              ? value.split(/[^a-zA-Z0-9]+/).filter(Boolean)
              : [value]

          filters.push({
            id: key,
            value: processedValue,
          })
        }
        return filters
      },
      [],
    )
  }, [filterValues])

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(initialColumnFilters)

  const onColumnFiltersChange = React.useCallback(
    (updaterOrValue: Updater<ColumnFiltersState>) => {
      if (enableAdvancedFilter) return

      setColumnFilters((prev) => {
        const next =
          typeof updaterOrValue === "function"
            ? updaterOrValue(prev)
            : updaterOrValue

        const filterUpdates = next.reduce<Record<string, string | string[] | null>>(
          (acc, filter) => {
            if (filterableColumns.find((column) => column.id === filter.id)) {
              acc[filter.id] = filter.value as string | string[]
            }
            return acc
          },
          {},
        )

        for (const prevFilter of prev) {
          if (!next.some((filter) => filter.id === prevFilter.id)) {
            filterUpdates[prevFilter.id] = null
          }
        }

        const filterUpdatesWithoutNull = Object.entries(filterUpdates).reduce<Record<string, string | string[]>>(
          (acc, [key, value]) => {
            if (value !== null) {
              acc[key] = value
            }
            return acc
          },
          {},
        )

        debouncedSetFilterValues(filterUpdatesWithoutNull)
        return next
      })
    },
    [debouncedSetFilterValues, filterableColumns, enableAdvancedFilter],
  )

  const table = useReactTable({
    ...tableProps,
    columns,
    initialState,
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
      enableColumnFilter: false,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange,
    onSortingChange,
    onColumnFiltersChange,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  })

  return table
}
