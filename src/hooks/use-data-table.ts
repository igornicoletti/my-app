import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type TableOptions,
  useReactTable,
} from '@tanstack/react-table'

type UseDataTableOptions<TData> = Omit<TableOptions<TData>, 'getCoreRowModel'>

export const useDataTable = <TData,>({ columns, ...options }: UseDataTableOptions<TData>) => {
  const table = useReactTable({
    defaultColumn: {
      enableColumnFilter: false,
    },
    enableRowSelection: true,
    manualFiltering: false,
    manualPagination: false,
    manualSorting: false,
    ...options,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return { table }
}
