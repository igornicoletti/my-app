import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui'
import type { TPaginationControlsProps } from '@/types'
import {
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CaretLeftIcon,
  CaretRightIcon
} from '@phosphor-icons/react'

export const PaginationControls = <TData,>({ table, pageSizeOptions = [10, 20, 30, 40, 50] }: TPaginationControlsProps<TData>) => (
  <div className='flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto sm:flex-row sm:gap-8'>
    <div className='flex-1 whitespace-nowrap text-sm text-muted-foreground'>
      {table.getFilteredSelectedRowModel().rows.length} of{" "}
      {table.getFilteredRowModel().rows.length} row(s) selected.
    </div>
    <div className='flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8'>
      <div className='flex items-center gap-2'>
        <p className='whitespace-nowrap text-sm'>Rows per page</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => table.setPageSize(Number(value))}>
          <SelectTrigger>
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent position='item-aligned'>
            {pageSizeOptions.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='flex items-center justify-center text-sm'>
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
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
