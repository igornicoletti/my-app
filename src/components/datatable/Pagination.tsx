import {
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CaretLeftIcon,
  CaretRightIcon
} from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'
import type { ComponentProps } from 'react'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface PaginationProps<TData> extends ComponentProps<'div'> {
  table: Table<TData>
  pageSizeOptions?: number[]
}

export const Pagination = <TData,>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
  className,
  ...props
}: PaginationProps<TData>) => (
  <div
    className={cn(
      'flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8',
      className,
    )}
    {...props}>
    <div className='flex-1 whitespace-nowrap text-muted-foreground text-sm'>
      {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
    </div>
    <div className='flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8'>
      <div className='flex items-center gap-2'>
        <p className='whitespace-nowrap font-medium text-sm'>Rows per page</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => table.setPageSize(Number(value))}>
          <SelectTrigger size='sm'>
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent position='item-aligned' className='min-w-[var(--radix-select-trigger-width)] origin-[var(--radix-select-content-transform-origin)]'>
            {pageSizeOptions.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='flex whitespace-nowrap items-center justify-center font-medium text-sm'>
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </div>
      <div className='flex items-center gap-2'>
        <Button
          aria-label='Go to first page'
          variant='outline'
          size='sm'
          className='hidden lg:flex'
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}>
          <CaretDoubleLeftIcon />
        </Button>
        <Button
          aria-label='Go to previous page'
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          <CaretLeftIcon />
        </Button>
        <Button
          aria-label='Go to next page'
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}>
          <CaretRightIcon />
        </Button>
        <Button
          aria-label='Go to last page'
          variant='outline'
          size='sm'
          className='hidden lg:flex'
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}>
          <CaretDoubleRightIcon />
        </Button>
      </div>
    </div>
  </div>
)
