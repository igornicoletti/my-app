import { Pagination } from '@/components/table/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getCommonPinningStyles } from '@/lib/column-styles'
import { cn } from '@/lib/utils'
import { flexRender, type HeaderGroup, type Row, type Table as TanstackTable } from '@tanstack/react-table'
import type { ComponentProps, ReactNode } from 'react'

interface DataTableProps<TData> extends ComponentProps<'div'> {
  table: TanstackTable<TData>
  actionBar?: ReactNode
}

const DataTableHeader = <TData,>({ headerGroups }: { headerGroups: HeaderGroup<TData>[] }) => (
  <TableHeader>
    {headerGroups.map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <TableHead key={header.id} colSpan={header.colSpan} style={getCommonPinningStyles({ column: header.column })}>
            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
          </TableHead>
        ))}
      </TableRow>
    ))}
  </TableHeader>
)

const DataTableBody = <TData,>({ rows, table }: { rows: Row<TData>[]; table: TanstackTable<TData> }) => (
  <TableBody>
    {rows.length > 0 ? (
      rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id} style={getCommonPinningStyles({ column: cell.column })}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={table.getAllColumns().length} className='h-24 text-center'>
          No results.
        </TableCell>
      </TableRow>
    )}
  </TableBody>
)

export const DataTable = <TData,>({ table, actionBar, children, className, ...props }: DataTableProps<TData>) => {
  const showActionBar = actionBar && table.getFilteredSelectedRowModel().rows.length > 0

  return (
    <div className={cn('flex w-full flex-col gap-4', className)} {...props}>
      {children}
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <DataTableHeader headerGroups={table.getHeaderGroups()} />
          <DataTableBody rows={table.getRowModel().rows} table={table} />
        </Table>
      </div>
      <div className='flex flex-col gap-2'>
        <Pagination table={table} />
        {showActionBar && actionBar}
      </div>
    </div>
  )
}
