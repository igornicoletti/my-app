import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/libs/utils'
import { CaretDoubleLeftIcon, CaretDoubleRightIcon, CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'
import type { ComponentProps } from 'react'

interface PaginationProps<TData> extends ComponentProps<'div'> {
  table: Table<TData>
  pageSizeOptions?: number[]
}

export const TablePagination = <TData,>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
  className,
  ...props
}: PaginationProps<TData>) => {
  return (
    <div className={cn('flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto sm:flex-row sm:gap-8', className)}
      {...props}>
      <div className='flex-1 whitespace-nowrap text-sm text-muted-foreground'>
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className='flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8'>
        <div className='flex items-center space-x-2'>
          <p className='whitespace-nowrap text-sm font-medium'>Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}>
            <SelectTrigger className='h-8 [&[data-size]]:h-8'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top' className='w-(--radix-select-trigger-width) min-w-full origin-[var(--radix-select-content-transform-origin)]'>
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='whitespace-nowrap text-sm font-medium'>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            aria-label='Go to first page'
            variant='outline'
            size='icon'
            className='size-8 lg:flex'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}>
            <CaretDoubleLeftIcon />
          </Button>
          <Button
            aria-label='Go to previous page'
            variant='outline'
            size='icon'
            className='size-8'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            <CaretLeftIcon />
          </Button>
          <Button
            aria-label='Go to next page'
            variant='outline'
            size='icon'
            className='size-8'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            <CaretRightIcon />
          </Button>
          <Button
            aria-label='Go to last page'
            variant='outline'
            size='icon'
            className='size-8 lg:flex'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}>
            <CaretDoubleRightIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
