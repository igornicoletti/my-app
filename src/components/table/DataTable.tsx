import { flexRender, type Table as TanstackTable } from '@tanstack/react-table'

import { Pagination } from '@/components/table/Pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface DataTableProps<TData> extends React.ComponentProps<'div'> {
  table: TanstackTable<TData>
  actionBar?: React.ReactNode
}

export const DataTable = <TData,>({
  table, actionBar, children
}: DataTableProps<TData>) => (
  <div className={'flex w-full flex-col gap-2.5 overflow-auto'}>
    {children}
    <div className='overflow-hidden rounded-md border'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
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
              <TableCell colSpan={table.getAllColumns().length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <div className='flex flex-col gap-2.5'>
      <Pagination table={table} />
      {actionBar && table.getFilteredSelectedRowModel().rows.length > 0 && actionBar}
    </div>
  </div>
)
