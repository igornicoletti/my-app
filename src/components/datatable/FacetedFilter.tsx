import { PlusCircleIcon, XCircleIcon } from '@phosphor-icons/react'
import type { Column } from '@tanstack/react-table'
import { useCallback, useMemo, useState, type MouseEvent } from 'react'

import { Checkbox } from '@/components/ui'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import type { Option } from '@/types/datatable'

interface FacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: Option[]
  multiple?: boolean
}

export const FacetedFilter = <TData, TValue>({
  column,
  title,
  options,
  multiple,
}: FacetedFilterProps<TData, TValue>) => {
  const [open, setOpen] = useState(false)

  const selectedValues = useMemo(() => {
    const filterValue = column?.getFilterValue()
    return new Set(Array.isArray(filterValue) ? filterValue : [])
  }, [column, column?.getFilterValue()])

  const onItemSelect = useCallback((value: string) => {
    if (multiple) {
      const newSelectedValues = new Set(selectedValues)
      if (newSelectedValues.has(value)) {
        newSelectedValues.delete(value)
      } else {
        newSelectedValues.add(value)
      }
      const filterValues = Array.from(newSelectedValues)
      column?.setFilterValue(filterValues.length ? filterValues : undefined)
    } else {
      const isSelected = selectedValues.has(value)
      column?.setFilterValue(isSelected ? undefined : [value])
      setOpen(false)
    }
  }, [column, multiple, selectedValues])

  const onReset = useCallback((event: MouseEvent) => {
    event.stopPropagation()
    column?.setFilterValue(undefined)
    setOpen(false)
  }, [column])

  const hasSelectedFilters = selectedValues.size > 0

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='border-dashed'>
          {/* Show clear filter icon if filters are applied, otherwise show plus icon */}
          {hasSelectedFilters ? (
            <div
              tabIndex={0}
              role='button'
              aria-label={`Clear ${title} filter`}
              onClick={onReset}>
              <XCircleIcon />
            </div>
          ) : (
            <PlusCircleIcon className='mr-2' />
          )}
          {title}
          {/* Display selected badges and clear all button */}
          {hasSelectedFilters && (
            <>
              <Separator orientation='vertical' className='mx-0.5 data-[orientation=vertical]:h-4' />
              {/* Badge for small screens */}
              <Badge variant='secondary' className='rounded-sm px-1 font-normal lg:hidden'>
                {selectedValues.size}
              </Badge>
              {/* Badges for larger screens */}
              <div className='hidden space-x-1 lg:flex'>
                {selectedValues.size > 2 ? (
                  <Badge variant='secondary' className='rounded-sm px-1 font-normal'>
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options.filter((option) => selectedValues.has(option.value)).map((option) => (
                    <Badge key={option.value} variant='secondary' className='rounded-sm px-1 font-normal'>
                      {option.label}
                    </Badge>
                  ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-48 p-0' align='start'>
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className='max-h-72 overflow-y-auto'>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem key={option.value} onSelect={() => onItemSelect(option.value)}>
                    <Checkbox checked={isSelected} />
                    {option.icon && <option.icon />}
                    <span className='truncate'>{option.label}</span>
                    {option.count && (
                      <span className='ml-auto font-mono text-xs'>{option.count}</span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {hasSelectedFilters && (
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
