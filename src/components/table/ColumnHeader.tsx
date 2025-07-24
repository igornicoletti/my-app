import { CaretDownIcon, CaretUpDownIcon, CaretUpIcon, EyeSlashIcon, XIcon } from '@phosphor-icons/react'
import type { Column } from '@tanstack/react-table'


import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ColumnHeaderProps<TData, TValue>
  extends React.ComponentProps<typeof DropdownMenuTrigger> {
  column: Column<TData, TValue>
  title: string
}

export const ColumnHeader = <TData, TValue>({
  column, title
}: ColumnHeaderProps<TData, TValue>) => {
  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className='text-sm'>{title}</div>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={'-ml-1.5 flex h-8 items-center gap-1.5 rounded-md px-2 py-1.5 hover:bg-accent focus:outline-none data-[state=open]:bg-accent [&_svg]:shrink-0 [&_svg]:text-muted-foreground'}>
        {title}
        {column.getCanSort() &&
          (column.getIsSorted() === 'desc' ? (
            <CaretDownIcon />
          ) : column.getIsSorted() === 'asc' ? (
            <CaretUpIcon />
          ) : (
            <CaretUpDownIcon />
          ))}
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='w-28'>
        {column.getCanSort() && (
          <>
            <DropdownMenuCheckboxItem
              checked={column.getIsSorted() === 'asc'}
              onClick={() => column.toggleSorting(false)}
              className='relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground'>
              <CaretUpIcon />
              Asc
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={column.getIsSorted() === 'desc'}
              onClick={() => column.toggleSorting(true)}
              className='relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground'>
              <CaretDownIcon />
              Desc
            </DropdownMenuCheckboxItem>
            {column.getIsSorted() && (
              <DropdownMenuItem onClick={() => column.clearSorting()} className='pl-2 [&_svg]:text-muted-foreground'>
                <XIcon />
                Reset
              </DropdownMenuItem>
            )}
          </>
        )}
        {column.getCanHide() && (
          <DropdownMenuCheckboxItem
            checked={!column.getIsVisible()}
            onClick={() => column.toggleVisibility(false)}
            className='relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground'>
            <EyeSlashIcon />
            Hide
          </DropdownMenuCheckboxItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
