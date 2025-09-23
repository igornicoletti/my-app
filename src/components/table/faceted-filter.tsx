import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import type { Option } from '@/types/data-table'
import { FunnelSimpleIcon, XIcon } from '@phosphor-icons/react'
import type { Column } from '@tanstack/react-table'
import { useMemo, useState } from 'react'

interface FacetedFilterProps<TData, TValue> {
  column: Column<TData, TValue>
  title: string
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
    const columnFilterValue = column.getFilterValue()
    if (Array.isArray(columnFilterValue)) return new Set(columnFilterValue)
    if (typeof columnFilterValue === 'string') return new Set([columnFilterValue])
    return new Set<string>()
  }, [column, column.getFilterValue()])

  const facetedCounts = column.getFacetedUniqueValues()

  const handleSelect = (optionValue: string) => {
    const newSelectedValues = new Set(selectedValues)
    if (newSelectedValues.has(optionValue)) {
      newSelectedValues.delete(optionValue)
    } else {
      newSelectedValues.add(optionValue)
    }
    const filterValue = Array.from(newSelectedValues)

    if (multiple) {
      column.setFilterValue(filterValue.length ? filterValue : undefined)
    } else {
      column.setFilterValue(filterValue.length ? filterValue[0] : undefined)
      setOpen(false)
    }
  }

  const handleClear = () => {
    column.setFilterValue(undefined)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 border-dashed'>
          {selectedValues.size > 0 ? (
            <div
              role='button'
              aria-label={`Clear ${title} filter`}
              tabIndex={0}
              onClick={handleClear}>
              <XIcon />
            </div>
          ) : (
            <FunnelSimpleIcon />
          )}
          <span>{title}</span>
          {selectedValues.size > 0 && (
            <>
              <Separator orientation='vertical' className='data-[orientation=vertical]:h-4' />
              <Badge variant='secondary' className='rounded-sm px-1 font-normal lg:hidden'>
                {selectedValues.size}
              </Badge>
              <div className='hidden space-x-1 lg:flex'>
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
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className='w-48 p-0'>
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem key={option.value} onSelect={() => handleSelect(option.value)}>
                  <Checkbox checked={selectedValues.has(option.value)} />
                  {option.icon && <option.icon className='text-muted-foreground' />}
                  <span className='flex-1 truncate'>{option.label}</span>
                  {facetedCounts.has(option.value) && (
                    <span className='ml-auto flex items-center justify-center font-mono text-xs'>
                      {facetedCounts.get(option.value)}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={handleClear} className='justify-center text-center'>
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
