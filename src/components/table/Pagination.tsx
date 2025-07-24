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
  SelectValue
} from '@/components'

export const Pagination = <TData,>({ table }: { table: Table<TData> }) => (
  <div className={'flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto sm:flex-row sm:gap-8'}>
    <div className='flex-1 whitespace-nowrap text-muted-foreground text-sm'>
      {table.getFilteredSelectedRowModel().rows.length} of{' '}
      {table.getFilteredRowModel().rows.length} row(s) selected.
    </div>
    <div className='flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8'>
      <div className='flex items-center gap-2'>
        <p className='whitespace-nowrap text-sm'>Rows per page</p>
        <Select
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={(value) => table.setPageSize(Number(value))}>
          <SelectTrigger className='h-8 w-[4.5rem] [&[data-size]]:h-8'>
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side='top'>
            {[10, 20, 25, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='flex items-center justify-center text-sm'>
        Page {table.getState().pagination.pageIndex + 1} of{' '}
        {table.getPageCount()}
      </div>
      <div className='flex items-center gap-2'>
        <Button
          aria-label='Go to first page'
          variant='outline'
          size='icon'
          className='hidden lg:flex'
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}>
          <CaretDoubleLeftIcon />
        </Button>
        <Button
          aria-label='Go to previous page'
          variant='outline'
          size='icon'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          <CaretLeftIcon />
        </Button>
        <Button
          aria-label='Go to next page'
          variant='outline'
          size='icon'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}>
          <CaretRightIcon />
        </Button>
        <Button
          aria-label='Go to last page'
          variant='outline'
          size='icon'
          className='hidden lg:flex'
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}>
          <CaretDoubleRightIcon />
        </Button>
      </div>
    </div>
  </div>
)
