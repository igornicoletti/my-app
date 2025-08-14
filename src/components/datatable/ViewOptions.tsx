import {
  CaretUpDownIcon,
  CheckIcon,
  SlidersHorizontalIcon
} from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'
import { useMemo } from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface ViewOptionsProps<TData> {
  table: Table<TData>
}

export const ViewOptions = <TData,>({ table }: ViewOptionsProps<TData>) => {
  const columns = useMemo(
    () =>
      table
        .getAllColumns()
        .filter((col) => typeof col.accessorFn !== 'undefined' && col.getCanHide()),
    [table],
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button aria-label='Toggle columns' role='combobox' variant='outline' size='sm' className='ml-auto hidden h-8 lg:flex'>
          <SlidersHorizontalIcon />
          View
          <CaretUpDownIcon className='ml-auto opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' className='w-44 p-0'>
        <Command>
          <CommandInput placeholder='Search columns...' />
          <CommandList>
            <CommandEmpty>No columns found.</CommandEmpty>
            <CommandGroup>
              {columns.map((column) => (
                <CommandItem key={column.id} onSelect={() => column.toggleVisibility(!column.getIsVisible())}>
                  <span className='truncate'>{column.columnDef.meta?.label ?? column.id}</span>
                  <CheckIcon
                    className={cn('ml-auto size-4 shrink-0', column.getIsVisible() ? 'opacity-100' : 'opacity-0')}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
