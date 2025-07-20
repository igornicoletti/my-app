import {
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CaretLeftIcon,
  CaretRightIcon
} from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components'

export const DataTablePagination = <TData,>({ table }: { table: Table<TData> }) => {
  const pageSize = table.getState().pagination.pageSize
  const pageIndex = table.getState().pagination.pageIndex
  const totalPages = table.getPageCount()

  return (
    <div className='flex items-center justify-between'>
      <div className='text-muted-foreground flex-1 text-sm'>
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected
      </div>
      <div className='flex items-center gap-6'>
        {/* Page size selector */}
        <div className='hidden lg:flex items-center gap-2'>
          <p className='text-sm'>Rows per page</p>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => table.setPageSize(Number(value))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent side='right'>
              {[10, 20, 25, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Page indicator */}
        <div className='hidden lg:flex w-32 items-center justify-center text-sm'>
          Page {pageIndex + 1} of {totalPages}
        </div>
        {/* Pagination controls */}
        <div className='flex items-center gap-2'>
          <Button
            size='icon'
            variant='outline'
            className='hidden lg:flex'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            aria-label='Go to first page'>
            <CaretDoubleLeftIcon />
          </Button>
          <Button
            size='icon'
            variant='outline'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label='Go to previous page'>
            <CaretLeftIcon />
          </Button>
          <Button
            size='icon'
            variant='outline'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label='Go to next page'>
            <CaretRightIcon />
          </Button>
          <Button
            size='icon'
            variant='outline'
            className='hidden lg:flex'
            onClick={() => table.setPageIndex(totalPages - 1)}
            disabled={!table.getCanNextPage()}
            aria-label='Go to last page'>
            <CaretDoubleRightIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
