import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import type { Option } from '@/types/data-table'
import { FunnelSimpleIcon, XIcon } from '@phosphor-icons/react'
import type { Column } from '@tanstack/react-table'
import { useCallback, useMemo, useState } from 'react'

interface TableFacetedProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: Option[]
  multiple?: boolean
}

export const TableFaceted = <TData, TValue>({
  column,
  title,
  options,
  multiple,
}: TableFacetedProps<TData, TValue>) => {
  const [open, setOpen] = useState(false)

  const columnFilterValue = column?.getFilterValue()
  const selectedValues = new Set(Array.isArray(columnFilterValue)
    ? columnFilterValue
    : []
  )

  const dynamicOptions = useMemo(() => {
    if (!column) return options

    const facetedUniqueValues = column.getFacetedUniqueValues?.()
    return options.map((option) => {
      const count = facetedUniqueValues?.get(option.value) ?? 0
      return { ...option, count }
    })
  }, [column, options, column?.getFacetedUniqueValues()])


  const onItemSelect = useCallback((option: Option, isSelected: boolean) => {
    if (!column) return

    if (multiple) {
      const newSelectedValues = new Set(selectedValues)
      if (isSelected) {
        newSelectedValues.delete(option.value)
      } else {
        newSelectedValues.add(option.value)
      }
      const filterValues = Array.from(newSelectedValues)
      column.setFilterValue(filterValues.length ? filterValues : undefined)
    } else {
      column.setFilterValue(isSelected ? undefined : [option.value])
      setOpen(false)
    }
  }, [column, multiple, selectedValues])

  const onReset = useCallback((event?: React.MouseEvent) => {
    event?.stopPropagation()
    column?.setFilterValue(undefined)
  }, [column])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='border-dashed'>
          {selectedValues.size > 0 ? (
            <div
              role='button'
              aria-label={`Clear ${title} filter`}
              tabIndex={0}
              onClick={onReset}>
              <XIcon />
            </div>
          ) : (
            <FunnelSimpleIcon />
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
                  dynamicOptions
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge variant='secondary' key={option.value} className='rounded-sm px-1 font-normal'>
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
          <CommandInput placeholder={`${title}...`} />
          <CommandList className='max-h-full'>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className='max-h-72 overflow-y-auto overflow-x-hidden'>
              {dynamicOptions.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => onItemSelect(option, isSelected)}>
                    <Checkbox checked={isSelected} />
                    {option.icon && <option.icon />}
                    <span className='truncate'>{option.label}</span>
                    {option.count !== undefined && (
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
