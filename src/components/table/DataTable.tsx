import { useState } from 'react'

import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table'

import {
  DataTableToolbar,
  PaginationControls,
  ScrollArea,
  ScrollBar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components'
import {
  ClockCountdownIcon,
  ProhibitIcon,
  UserCircleCheckIcon
} from '@phosphor-icons/react'
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
const statusOptions = [
  { label: 'Done', value: 'done', icon: UserCircleCheckIcon },
  { label: 'Blocked', value: 'blocked', icon: ProhibitIcon },
  { label: 'In Progress', value: 'in-progress', icon: ClockCountdownIcon }
]
export const DataTable = <TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    state: { sorting, columnVisibility, rowSelection, columnFilters },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const rowModel = table.getRowModel()
  const visibleColumnsCount = table.getVisibleFlatColumns().length

  return (
    <div className='flex flex-col gap-4'>
      <DataTableToolbar
        table={table}
        globalFilterColumnId="name"
        filters={[
          {
            id: 'status',
            title: 'Status',
            options: statusOptions
          }
        ]}
      />


      <ScrollArea className="grid w-full border rounded-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rowModel.rows?.length ? (
              rowModel.rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleColumnsCount || 1} className='py-2 text-center'>
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>


      <PaginationControls table={table} />
    </div>
  )
}
