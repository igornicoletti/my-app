import {
  FunnelSimpleIcon,
  XIcon
} from '@phosphor-icons/react'
import type { Column } from '@tanstack/react-table'
import {
  useCallback,
  useState,
  type MouseEvent
} from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
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
    if (!multiple) setOpen(false)
  }, [column, multiple])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='border-dashed'>
          {selectedValues?.size > 0 ? (
            <div tabIndex={0}
              onClick={onReset}
              aria-label={`Clear ${title} filter`}
              role='button'>
              <XIcon />
            </div>
          ) : (
            <FunnelSimpleIcon />
          )}
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator
                orientation='vertical'
                className='mx-0.5 data-[orientation=vertical]:h-4' />
              <Badge variant='secondary' className='lg:hidden'>
                {selectedValues.size}
              </Badge>
              <div className='hidden items-center gap-1 lg:flex'>
                {selectedValues.size > 2 ? (
                  <Badge variant='secondary'>
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge key={option.value} variant='secondary'>
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
              {options.map((option) => {
                const checked = selectedValues.has(option.value)

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => onItemSelect(option, checked)}>
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => onItemSelect(option, checked)} />
                    {option.icon && <option.icon />}
                    <span className='truncate'>{option.label}</span>
                    {option.count && (
                      <span className='ml-auto font-mono text-xs text-muted-foreground'>
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
