import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CheckIcon, SlidersHorizontalIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'
import { useMemo } from 'react'

interface TableViewProps<TData> {
  table: Table<TData>
}

export const TableView = <TData,>({
  table,
}: TableViewProps<TData>) => {
  const columns = useMemo(() => table.getAllColumns().filter((column) =>
    typeof column.accessorFn !== 'undefined' && column.getCanHide()
  ), [table])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label='Toggle columns'
          role='combobox'
          variant='outline'
          size='sm'
          className='hidden h-8 lg:flex'>
          <SlidersHorizontalIcon />
          View
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' className='w-48 p-0'>
        <Command>
          <CommandInput placeholder='Columns...' />
          <CommandList>
            <CommandEmpty>No columns found.</CommandEmpty>
            <CommandGroup>
              {columns.map(column => (
                <CommandItem key={column.id} onSelect={() => column.toggleVisibility(!column.getIsVisible())}>
                  <CheckIcon className={column.getIsVisible() ? 'opacity-100' : 'opacity-0'} />
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
