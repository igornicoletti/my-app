import { flexRender, type Table as TanstackTable } from '@tanstack/react-table'
import type { ComponentProps, ReactNode } from 'react'

import { Pagination } from '@/components/table/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { getCommonPinningStyles } from '@/lib/column-styles'
import { cn } from '@/lib/utils'

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
}: DataTableProps<TData>) => (
  <div className={cn('flex w-full flex-col gap-2 overflow-auto', className)} {...props}>
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
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <div className='flex flex-col gap-2'>
      <Pagination table={table} />
      {actionBar && table.getFilteredSelectedRowModel().rows.length > 0 && actionBar}
    </div>
  </div>
)
