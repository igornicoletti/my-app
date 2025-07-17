import { PlusCircleIcon } from '@phosphor-icons/react'
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

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

export const DataTableFacetedFilter = <TData, TValue>({
  column,
  title = 'Filter',
  options
}: DataTableFacetedFilterProps<TData, TValue>) => {
  const facets = column?.getFacetedUniqueValues()
  const filterValue = column?.getFilterValue()
  const selectedValues = new Set(filterValue as string[])

  const handleSelect = (value: string) => {
    const newSelectedValues = new Set(selectedValues)
    if (newSelectedValues.has(value)) {
      newSelectedValues.delete(value)
    } else {
      newSelectedValues.add(value)
    }

    const valuesArray = Array.from(newSelectedValues)
    column?.setFilterValue(valuesArray.length ? valuesArray : undefined)
  }

  const renderSelectedBadges = () => {
    if (selectedValues.size === 0) return null

    return (
      <>
        <Separator orientation='vertical' className='mx-2 h-4' />
        <Badge variant='secondary' className='rounded-sm px-1 font-normal lg:hidden'>
          {selectedValues.size}
        </Badge>
        <div className='hidden gap-1 lg:flex'>
          {selectedValues.size > 2 ? (
            <Badge variant='secondary' className='rounded-sm px-1 font-normal'>
              {selectedValues.size} selected
            </Badge>
          ) : (
            options
              .filter((option) => selectedValues.has(option.value))
              .map((option) => (
                <Badge key={option.value} variant='secondary' className='rounded-sm px-1 font-normal'>
                  {option.label}
                </Badge>
              ))
          )}
        </div>
      </>
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size='sm'
          variant='outline'
          className='h-8 border-dashed'
          aria-label={`Filter by ${title}`}>
          <PlusCircleIcon />
          {title}
          {renderSelectedBadges()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-48 p-0' align='start'>
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.length === 0 && (
                <CommandItem disabled>
                  No option available.
                </CommandItem>
              )}
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                const Icon = option.icon
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                    aria-checked={isSelected}
                    role='checkbox'
                    className='flex items-center gap-2'>
                    <Checkbox checked={isSelected} />
                    {Icon && <Icon />}
                    {option.label}
                    {facets?.get(option.value) && (
                      <span className='ml-auto text-xs text-muted-foreground'>
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className='justify-center text-center'>
                    Clear filters
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
