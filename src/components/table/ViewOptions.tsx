import { useMemo } from 'react'

import { CheckIcon, SlidersHorizontalIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui'

export const ViewOptions = <TData,>({ table }: { table: Table<TData> }) => {
  const hideableColumns = useMemo(() => {
    return table.getAllColumns().filter((column) => {
      return typeof column.accessorFn !== 'undefined' && column.getCanHide()
    })
  }, [table])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='ml-auto hidden lg:flex'>
          <SlidersHorizontalIcon />
          View
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' className='w-48 p-0'>
        <Command>
          <CommandInput placeholder='Columns' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {hideableColumns.map((column) => (
                <CommandItem
                  key={column.id}
                  aria-checked={column.getIsVisible()}
                  onSelect={() => column.toggleVisibility(!column.getIsVisible())}>
                  <span className='truncate capitalize'>
                    {typeof column.columnDef.header === 'string'
                      ? column.columnDef.header
                      : column.id}
                  </span>
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
