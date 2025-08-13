import {
  ArrowsDownUpIcon,
  EyeSlashIcon,
  SortAscendingIcon,
  SortDescendingIcon,
  XIcon
} from '@phosphor-icons/react'
import type { Column } from '@tanstack/react-table'

import { Button } from '@/components/ui'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ColumnHeaderProps<TData, TValue> extends React.ComponentProps<typeof DropdownMenuTrigger> {
  column: Column<TData, TValue>
  title: string
}

export const ColumnHeader = <TData, TValue>({
  column,
  title,
}: ColumnHeaderProps<TData, TValue>) => {
  if (!column.getCanSort() && !column.getCanHide()) return title

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm' className='-ml-2 data-[state=open]:bg-accent [&_svg]:text-muted-foreground'>
          {title}
          {column.getCanSort() &&
            (column.getIsSorted() === 'desc' ? (
              <SortDescendingIcon />
            ) : column.getIsSorted() === 'asc' ? (
              <SortAscendingIcon />
            ) : (
              <ArrowsDownUpIcon />
            ))}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='w-28'>
        {column.getCanSort() && (
          <>
            <DropdownMenuCheckboxItem
              className='relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground'
              checked={column.getIsSorted() === 'asc'}
              onClick={() => column.toggleSorting(false)}>
              <SortAscendingIcon />
              Asc
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              className='relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground'
              checked={column.getIsSorted() === 'desc'}
              onClick={() => column.toggleSorting(true)}>
              <SortDescendingIcon />
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
