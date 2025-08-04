import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import type { TColumnHeaderProps } from '@/types'
import {
  CaretDownIcon,
  CaretUpDownIcon,
  CaretUpIcon,
  EyeSlashIcon,
  XIcon
} from '@phosphor-icons/react'

export const ColumnHeader = <TData,>({ column, title }: TColumnHeaderProps<TData>) => {
  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className='text-sm'>{title}</div>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm' className='-ml-2 data-[state=open]:bg-accent [&_svg]:text-muted-foreground'>
          {title}
          {column.getCanSort() &&
            (column.getIsSorted() === 'desc' ? (
              <CaretDownIcon />
            ) : column.getIsSorted() === 'asc' ? (
              <CaretUpIcon />
            ) : (
              <CaretUpDownIcon />
            ))}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        {column.getCanSort() && (
          <>
            <DropdownMenuCheckboxItem
              checked={column.getIsSorted() === 'asc'}
              onClick={() => column.toggleSorting(false, true)}
              className='relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground'>
              <CaretUpIcon />
              Asc
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={column.getIsSorted() === 'desc'}
              onClick={() => column.toggleSorting(true, true)}
              className='relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground'>
              <CaretDownIcon />
              Desc
            </DropdownMenuCheckboxItem>
            {column.getIsSorted() && (
              <DropdownMenuItem
                onClick={() => column.clearSorting()}
                className='pl-2 [&_svg]:text-muted-foreground'>
                <XIcon />
                Reset
              </DropdownMenuItem>
            )}
          </>
        )}
        {column.getCanHide() && (
          <DropdownMenuCheckboxItem
            checked={!column.getIsVisible()}
            onClick={() => column.toggleVisibility(!column.getIsVisible())}
            className='relative hidden lg:flex pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground'>
            <EyeSlashIcon />
            Hide
          </DropdownMenuCheckboxItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
