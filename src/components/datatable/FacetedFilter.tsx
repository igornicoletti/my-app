import { PlusCircleIcon, XCircleIcon } from '@phosphor-icons/react'
import type { Column } from '@tanstack/react-table'
import { useCallback, useState, type MouseEvent } from 'react'

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
  multiple
}: FacetedFilterProps<TData, TValue>) => {
  const [open, setOpen] = useState(false)

  const columnFilterValue = column?.getFilterValue()
  const selectedValues = new Set(Array.isArray(columnFilterValue) ? columnFilterValue : [])

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

  const onReset = useCallback((event?: MouseEvent) => {
    event?.stopPropagation()
    column?.setFilterValue(undefined)
  }, [column])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='border-dashed [&_svg]:size-4'>
          {selectedValues?.size > 0 ? (
            <div
              role='button'
              aria-label={`Clear ${title} filter`}
              tabIndex={0}
              onClick={onReset}>
              <XCircleIcon />
            </div>
          ) : (
            <PlusCircleIcon />
          )}
          {title}
          {selectedValues?.size > 0 && (
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
                  options.filter(option => selectedValues.has(option.value)).map(option => (
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
          <CommandInput placeholder={title} />
          <CommandList className='max-h-full'>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className='max-h-72 overflow-y-auto overflow-x-hidden'>
              {options.map(option => (
                <CommandItem key={option.value} onSelect={() => onItemSelect(option, selectedValues.has(option.value))}>
                  <Checkbox checked={selectedValues.has(option.value)} />
                  {option.icon && <option.icon />}
                  <span className='truncate'>{option.label}</span>
                  {option.count && (
                    <span className='ml-auto font-mono text-xs'>
                      {option.count}
                    </span>
                  )}
                </CommandItem>
              ))}
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
/*
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
  const isMobile = useMediaQuery('(max-width: 639px)')

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
          {hasSelectedFilters ? (
            <div
              role='button'
              aria-label={`Clear ${title} Filter`}
              tabIndex={0}
              onClick={onReset}>
              <XCircleIcon />
            </div>
          ) : (
            <FunnelIcon />
          )}
          {title}
          {hasSelectedFilters && (
            <>
              <Separator orientation='vertical' className='mx-0.5 data-[orientation=vertical]:h-4' />
              <Badge variant='secondary' className='rounded-sm px-1 font-normal lg:hidden'>
                {selectedValues.size}
              </Badge>
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
          <CommandInput tabIndex={isMobile ? -1 : 1} placeholder={title} />
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
    </Popover >
  )
}
 */
