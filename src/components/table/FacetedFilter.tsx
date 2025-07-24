import { useCallback, useState } from 'react'

import { CheckIcon, PlusCircleIcon, XCircleIcon } from '@phosphor-icons/react'
import type { Column } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

interface Option {
  label: string
  value: string
  count: string
  icon?: React.ComponentType<{ className?: string }>
}

interface FacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: Option[]
}

export const FacetedFilter = <TData, TValue>({
  column, title, options
}: FacetedFilterProps<TData, TValue>) => {
  const [open, setOpen] = useState(false)

  const columnFilterValue = column?.getFilterValue()
  const selectedValues = new Set(Array.isArray(columnFilterValue) ? columnFilterValue : [])

  const onItemSelect = useCallback((option: Option, isSelected: boolean) => {
    if (!column) return

    const currentValue = column.getFilterValue()
    const currentSet = new Set(Array.isArray(currentValue) ? currentValue : [])

    if (isSelected) {
      currentSet.delete(option.value)
    } else {
      currentSet.add(option.value)
    }

    const filterValues = Array.from(currentSet)
    column.setFilterValue(filterValues.length ? filterValues : undefined)
  }, [column])

  const onReset = useCallback((event?: React.MouseEvent) => {
    event?.stopPropagation()
    column?.setFilterValue(undefined)
  }, [column])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='border-dashed'>
          {selectedValues.size > 0 ? (
            <div tabIndex={0} onClick={onReset} aria-label={`Clear ${title} filter`} role='button' className='rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'>
              <XCircleIcon />
            </div>
          ) : (
            <PlusCircleIcon />
          )}
          {title}
          {selectedValues.size > 0 && (
            <>
              <Separator orientation='vertical' className='mx-0.5 data-[orientation=vertical]:h-4' />
              <Badge variant='secondary' className='rounded-sm px-1 font-normal lg:hidden'>
                {selectedValues.size}
              </Badge>
              <div className='hidden items-center gap-1 lg:flex'>
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
      <PopoverContent className='w-[12.5rem] p-0' align='start'>
        <Command>
          <CommandInput placeholder={title} />
          <CommandList className='max-h-full'>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className='max-h-[18.75rem] overflow-y-auto overflow-x-hidden'>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem key={option.value} onSelect={() => onItemSelect(option, isSelected)}>
                    <div className={`flex size-4 items-center justify-center rounded-sm border border-primary ${isSelected ? 'bg-primary' : 'opacity-50 [&_svg]:invisible'}`}>
                      <CheckIcon />
                    </div>
                    {option.icon && <option.icon />}
                    <span className='truncate'>{option.label}</span>
                    {option.count && (
                      <span className='ml-auto font-mono text-xs'>
                        {option.count}
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
                  <CommandItem onSelect={() => onReset()} className='justify-center text-center'>
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
