import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/libs/utils'
import { ArrowDownIcon, ArrowsClockwiseIcon, ArrowsDownUpIcon, ArrowUpIcon, EyeSlashIcon } from '@phosphor-icons/react'
import type { Column } from '@tanstack/react-table'
import type { HTMLAttributes } from 'react'

const SortIndicator = ({ sortDirection }: { sortDirection: 'asc' | 'desc' | false }) => {
  if (sortDirection === 'desc') return <ArrowDownIcon />
  if (sortDirection === 'asc') return <ArrowUpIcon />
  return <ArrowsDownUpIcon className='text-muted-foreground/70' />
}

const SortMenuItems = <TData, TValue>({ column }: { column: Column<TData, TValue> }) => (
  <>
    <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
      <ArrowUpIcon className='text-muted-foreground/70' />
      Asc
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
      <ArrowDownIcon className='text-muted-foreground/70' />
      Desc
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
      <EyeSlashIcon className='text-muted-foreground/70' />
      Hide
    </DropdownMenuItem>
    {column.getIsSorted() && (
      <>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => column.clearSorting()}>
          <ArrowsClockwiseIcon className='text-muted-foreground/70' />
          Reset
        </DropdownMenuItem>
      </>
    )}
  </>
)

interface ColumnHeaderProps<TData, TValue> extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export const ColumnHeader = <TData, TValue>({
  column,
  title,
  className,
}: ColumnHeaderProps<TData, TValue>) => {
  const canSort = column.getCanSort()

  if (!canSort) {
    return <div className={cn('text-sm font-medium', className)}>{title}</div>
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label={canSort ? 'Sort by ' + title : title}
            variant='ghost'
            size='sm'
            className='-ml-3 h-8'>
            <span>{title}</span>
            {canSort && <SortIndicator sortDirection={column.getIsSorted()} />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          {canSort && <SortMenuItems column={column} />}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
