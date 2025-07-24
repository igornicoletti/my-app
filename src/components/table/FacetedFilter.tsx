import { FunnelSimpleIcon } from '@phosphor-icons/react'
import type { Column } from '@tanstack/react-table'

import {
  Badge,
  Button,
  Checkbox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator
} from '@/components'

interface FacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

export const FacetedFilter = <TData, TValue>({
  column,
  title,
  options
}: FacetedFilterProps<TData, TValue>) => {
  const facets = column?.getFacetedUniqueValues()
  const filterValue = column?.getFilterValue()
  const selectedValues = new Set(filterValue as string[])

  const toggleValue = (value: string) => {
    const updated = new Set(selectedValues)
    if (updated.has(value)) {
      updated.delete(value)
    } else {
      updated.add(value)
    }
    column?.setFilterValue(updated.size ? Array.from(updated) : undefined)
  }

  const renderBadges = () => {
    if (selectedValues.size === 0) return null

    return (
      <>
        <Separator orientation='vertical' />
        <Badge variant='secondary' className='lg:hidden'>{selectedValues.size}</Badge>
        <div className='hidden gap-1 lg:flex'>
          {selectedValues.size > 2 ? (
            <Badge variant='secondary'>{selectedValues.size} selected</Badge>
          ) : (
            options
              .filter((o) => selectedValues.has(o.value))
              .map((o) => (
                <Badge key={o.value} variant='secondary'>{o.label}</Badge>
              ))
          )}
        </div>
      </>
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='hidden lg:flex border-dashed'>
          <FunnelSimpleIcon />
          {title}
          {renderBadges()}
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className='w-48 p-0'>
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map(({ value, label, icon: Icon }) => (
                <CommandItem
                  key={value}
                  onSelect={() => toggleValue(value)}
                  aria-checked={selectedValues.has(value)}
                  className='flex items-center gap-2'>
                  <Checkbox checked={selectedValues.has(value)} />
                  {Icon && <Icon />}
                  <span className='truncate'>{label}</span>
                  {facets?.get(value) && (
                    <span className='ml-auto text-xs text-muted-foreground'>
                      {facets.get(value)}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>

            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className='justify-center text-center'>
                    Clear Filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
