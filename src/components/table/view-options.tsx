import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { SlidersHorizontalIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'
import { useMemo } from 'react'

interface ViewOptionsProps<TData> {
  table: Table<TData>
}

export const ViewOptions = <TData,>({ table }: ViewOptionsProps<TData>) => {
  const hideableColumns = useMemo(() => table.getAllLeafColumns().filter((column) =>
    column.getCanHide()
  ), [table.getAllLeafColumns()])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label='Toggle columns'
          variant='outline'
          size='sm'
          className='ml-auto hidden h-8 text-sm lg:flex'>
          <SlidersHorizontalIcon />
          View
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' className='w-48 p-0'>
        <Command>
          <CommandInput placeholder='Search columns...' />
          <CommandList>
            <CommandEmpty>No column found.</CommandEmpty>
            <CommandGroup>
              {hideableColumns.map((column) => (
                <CommandItem key={column.id} onSelect={() => column.toggleVisibility(!column.getIsVisible())}>
                  <Checkbox checked={column.getIsVisible()} />
                  <span className='truncate capitalize'>{column.columnDef.meta?.label ?? column.id}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
