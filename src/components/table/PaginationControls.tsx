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

export const PaginationControls = <TData,>({ table }: { table: Table<TData> }) => (
  <div className='flex flex-col lg:flex-row items-center justify-between gap-4'>
    <div className="flex-1 items-center text-sm text-muted-foreground">
      {table.getFilteredSelectedRowModel().rows.length} of{' '}
      {table.getFilteredRowModel().rows.length} row(s) selected
    </div>
    <div className='flex flex-col-reverse lg:flex-row items-center gap-4 lg:gap-12'>
      {/* Page size selector */}
      <div className='flex items-center gap-2'>
        <p className='text-sm text-muted-foreground'>Rows per page</p>
        <Select value={table.getState().pagination.pageSize.toString()} onValueChange={(value) => table.setPageSize(Number(value))}>
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
      <div className="flex items-center text-sm text-muted-foreground">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </div>
      {/* Pagination controls */}
      <div className='flex items-center gap-2'>
        <Button
          size='icon'
          variant='outline'
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
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          aria-label='Go to last page'>
          <CaretDoubleRightIcon />
        </Button>
      </div>
    </div>
  </div>
)
