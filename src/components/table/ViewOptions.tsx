import { useMemo } from 'react'

import { CheckIcon, SlidersHorizontalIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface ViewOptionsProps<TData> {
  table: Table<TData>
}

export const ViewOptions = <TData,>({ table }: ViewOptionsProps<TData>) => {
  const columns = useMemo(() => table.getAllColumns().filter((column) =>
    typeof column.accessorFn !== 'undefined' && column.getCanHide()
  ), [table])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button aria-label='Toggle columns' role='combobox' variant='outline' size='sm' className='ml-auto hidden h-8 lg:flex'>
          <SlidersHorizontalIcon />
          View
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
                  <span className='truncate'>{column.id}</span>
                  <CheckIcon className={`ml-auto shrink-0 ${column.getIsVisible() ? 'opacity-100' : 'opacity-0'}`} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
