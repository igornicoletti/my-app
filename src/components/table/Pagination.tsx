import {
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CaretLeftIcon,
  CaretRightIcon
} from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'

import {
  Button, Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui'

export const Pagination = <TData,>({ table }: { table: Table<TData> }) => {
  const { pageIndex, pageSize } = table.getState().pagination

  const selectedRowCount = table.getFilteredSelectedRowModel().rows.length
  const totalRowCount = table.getFilteredRowModel().rows.length

  return (
    <div className='flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto sm:flex-row sm:gap-8'>
      <div className='flex-1 whitespace-nowrap text-sm text-muted-foreground'>
        {selectedRowCount} of {totalRowCount} row{totalRowCount !== 1 && 's'} selected.
      </div>
      <div className='flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8'>
        <div className='flex items-center gap-2'>
          <p className='whitespace-nowrap text-sm'>Rows per page</p>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => table.setPageSize(Number(value))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent position='item-aligned'>
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center justify-center text-sm'>
          Page {pageIndex + 1} of {table.getPageCount()}
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
}
