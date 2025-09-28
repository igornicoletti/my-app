import { TablePagination } from '@/components/table/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getCommonPinningStyles } from '@/libs/column-styles'
import { cn } from '@/libs/utils'
import { flexRender, type Table as TanstackTable } from '@tanstack/react-table'
import { type ComponentProps, type ReactNode } from 'react'

interface DataTableProps<TData> extends ComponentProps<'div'> {
  table: TanstackTable<TData>
  actionBar?: ReactNode
}

export const DataTable = <TData,>({
  table,
  actionBar,
  children,
  className,
  ...props
}: DataTableProps<TData>) => {
  return (
    <div className={cn('flex w-full flex-col gap-2 p-2 overflow-auto', className)} {...props}>
      {children}
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan} style={{ ...getCommonPinningStyles({ column: header.column }) }}>
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
                    <TableCell key={cell.id} style={{ ...getCommonPinningStyles({ column: cell.column }) }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className='h-24 text-center'>
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex flex-col gap-2.5'>
        <TablePagination table={table} />
        {actionBar && table.getFilteredSelectedRowModel().rows.length > 0 && actionBar}
      </div>
    </div>
  )
}
