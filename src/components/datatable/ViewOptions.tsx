import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import type { TViewOptionsProps } from '@/types'
import { CheckIcon, SlidersHorizontalIcon } from '@phosphor-icons/react'
import { useMemo } from 'react'

export const ViewOptions = <TData,>({ table }: TViewOptionsProps<TData>) => {
  const columns = useMemo(() => {
    return table.getAllColumns().filter((column) =>
      typeof column.accessorFn !== 'undefined' && column.getCanHide()
    )
  }, [table])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='ml-auto hidden lg:flex'>
          <SlidersHorizontalIcon />
          Columns
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' className='w-48 p-0'>
        <Command>
          <CommandInput placeholder='Columns' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {columns.map((column) => (
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
