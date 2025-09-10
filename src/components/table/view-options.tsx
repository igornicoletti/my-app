import { CheckIcon, SlidersHorizontalIcon } from '@phosphor-icons/react'
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface ViewOptionsProps<TData> {
  table: Table<TData>
}

export const ViewOptions = <TData,>({ table }: ViewOptionsProps<TData>) => {
  const columns = useMemo(() => table.getAllColumns().filter((col) =>
    typeof col.accessorFn !== 'undefined' && col.getCanHide()
  ), [table])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button aria-label='Toggle columns' role='combobox' variant='outline' size='sm' className='ml-auto hidden h-8 lg:flex'>
          <SlidersHorizontalIcon />
          View
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-48 p-0' align='end'>
        <Command>
          <CommandInput placeholder='Search columns...' />
          <CommandList className='max-h-full'>
            <CommandEmpty>No columns found.</CommandEmpty>
            <CommandGroup className='max-h-72 overflow-y-auto overflow-x-hidden'>
              {columns.map((column) => (
                <CommandItem
                  key={column.id}
                  onSelect={() => column.toggleVisibility(!column.getIsVisible())}>
                  <CheckIcon weight='bold' className={`${column.getIsVisible() ? 'opacity-100' : 'opacity-0'}`} />
                  <span className='truncate capitalize'>
                    {column.columnDef.meta?.label ?? column.id}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
