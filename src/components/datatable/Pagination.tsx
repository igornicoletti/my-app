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
  SelectValue,
} from '@/components/ui/select'

interface PaginationProps<TData> extends ComponentProps<'div'> {
  table: Table<TData>
  pageSizeOptions?: number[]
}

export const Pagination = <TData,>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50]
}: PaginationProps<TData>) => (
  <div className={'flex w-full flex-col-reverse items-center gap-4 sm:flex-row lg:gap-6'}>
    <div className='flex-1 text-muted-foreground text-sm'>
      {table.getFilteredSelectedRowModel().rows.length} of{' '}
      {table.getFilteredRowModel().rows.length} row(s) selected.
    </div>
    <div className='flex flex-col-reverse items-center gap-4 sm:flex-row lg:gap-6'>
      <div className='flex items-center gap-2'>
        <p className='whitespace-nowrap text-sm'>Rows per page</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value))
          }}>
          <SelectTrigger size='sm' className='h-8'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent side='top'>
            {pageSizeOptions.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='whitespace-nowrap text-sm'>
        Page {table.getState().pagination.pageIndex + 1} of{' '}
        {table.getPageCount() > 0 ? table.getPageCount() : 1}
      </div>
      <div className='flex items-center gap-1'>
        <Button
          aria-label='Go to first page'
          variant='outline'
          size='icon'
          className='hidden size-8 lg:flex'
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
          className='hidden size-8 lg:flex'
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}>
          <CaretDoubleRightIcon />
        </Button>
      </div>
    </div>
  </div>
)
