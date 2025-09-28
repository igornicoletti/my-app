import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/libs/utils'
import { CaretDownIcon, CaretUpDownIcon, CaretUpIcon, EyeSlashIcon, XIcon } from '@phosphor-icons/react'
import type { Column } from '@tanstack/react-table'
import type { ComponentProps } from 'react'

interface TableSortProps<TData, TValue>
  extends ComponentProps<typeof DropdownMenuTrigger> {
  column: Column<TData, TValue>
  title: string
}

export const TableSort = <TData, TValue>({
  column,
  title,
  className,
  ...props
}: TableSortProps<TData, TValue>) => {
  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn('flex items-center gap-2 [&_svg]:text-muted-foreground', className)}{...props}>
        {title}
        {column.getCanSort() && (column.getIsSorted() === 'desc' ? (
          <CaretDownIcon />
        ) : column.getIsSorted() === 'asc' ? (
          <CaretUpIcon />
        ) : (
          <CaretUpDownIcon />
        ))}
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        {column.getCanSort() && (
          <>
            <DropdownMenuCheckboxItem
              className='relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground'
              checked={column.getIsSorted() === 'asc'}
              onClick={() => column.toggleSorting(false)}>
              <CaretUpIcon />
              Asc
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              className='relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground'
              checked={column.getIsSorted() === 'desc'}
              onClick={() => column.toggleSorting(true)}>
              <CaretDownIcon />
              Desc
            </DropdownMenuCheckboxItem>
            {column.getIsSorted() && (
              <DropdownMenuItem
                className='pl-2 [&_svg]:text-muted-foreground'
                onClick={() => column.clearSorting()}>
                <XIcon />
                Reset
              </DropdownMenuItem>
            )}
          </>
        )}
        {column.getCanHide() && (
          <DropdownMenuCheckboxItem
            className='relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground'
            checked={!column.getIsVisible()}
            onClick={() => column.toggleVisibility(false)}>
            <EyeSlashIcon />
            Hide
          </DropdownMenuCheckboxItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
