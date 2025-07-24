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
} from '@/components'

const formatColumnLabel = (id: string) =>
  id.replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ').replace(/\s+/g, ' ').trim()

export const ViewOptions = <TData,>({
  table
}: { table: Table<TData> }) => {
  const columns = useMemo(() =>
    table.getAllColumns().filter(
      (col) => typeof col.accessorFn !== 'undefined' && col.getCanHide()
    ), [table]
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button role='combobox' variant='outline' aria-label='Toggle columns' className='ml-auto hidden lg:flex'>
          <SlidersHorizontalIcon />
          View
        </Button>
      </PopoverTrigger>

      <PopoverContent align='end' className='w-48 p-0'>
        <Command>
          <CommandInput placeholder='Search columns...' />
          <CommandList>
            <CommandEmpty>No columns found.</CommandEmpty>
            <CommandGroup>
              {columns.map((column) => (
                <CommandItem
                  key={column.id}
                  onSelect={() => column.toggleVisibility(!column.getIsVisible())}>
                  <span className='capitalize truncate'>{formatColumnLabel(column.id)}</span>
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
