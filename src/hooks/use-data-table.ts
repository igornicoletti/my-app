import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type TableOptions,
  useReactTable
} from '@tanstack/react-table'

interface UseDataTableProps<TData> extends Omit<TableOptions<TData>, 'getCoreRowModel'> { }

export const useDataTable = <TData,>(props: UseDataTableProps<TData>) => {
  const { columns, ...tableProps } = props

  const table = useReactTable({
    ...tableProps,
    columns,
    defaultColumn: {
      ...tableProps.defaultColumn,
      enableColumnFilter: false,
    },
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualFiltering: false,
    manualPagination: false,
    manualSorting: false,
  })

  return { table }
}
