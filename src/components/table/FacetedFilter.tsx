import { useCallback } from 'react'

import { FunnelSimpleIcon, XIcon } from '@phosphor-icons/react'
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
  Separator,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui'
import type { ColumnOption } from '@/features/app/tasks/data/tasks.types'


interface FacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: ColumnOption[]
}

export const FacetedFilter = <TData, TValue>({
  column, title, options
}: FacetedFilterProps<TData, TValue>) => {
  const columnFilterValue = column?.getFilterValue()
  const selectedValues = new Set<string>(Array.isArray(columnFilterValue) ? columnFilterValue : [])

  const selectedOptions = options.filter((option) =>
    selectedValues.has(option.value))

  const handleSelect = useCallback((option: ColumnOption, isSelected: boolean) => {
    if (!column) return

    const current = column.getFilterValue()
    const valueSet = new Set<string>(
      Array.isArray(current) ? current : []
    )

    if (isSelected) {
      valueSet.delete(option.value)
    } else {
      valueSet.add(option.value)
    }

    const next = Array.from(valueSet)
    column.setFilterValue(next.length ? next : undefined)
  }, [column])

  const handleReset = useCallback((event?: React.MouseEvent) => {
    event?.stopPropagation()
    column?.setFilterValue(undefined)
  }, [column])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='border-dashed'>
          {selectedValues.size > 0 ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div tabIndex={0} onClick={handleReset} aria-label={`Clear ${title} filter`} role='button'>
                  <XIcon />
                </div>
              </TooltipTrigger>
              <TooltipContent>Clear filter</TooltipContent>
            </Tooltip>
          ) : (
            <FunnelSimpleIcon />
          )}
          {title}
          {selectedValues.size > 0 && (
            <>
              <Separator orientation='vertical' className='mx-0.5 data-[orientation=vertical]:h-4' />
              <Badge variant='secondary' className='lg:hidden'>
                {selectedValues.size}
              </Badge>
              <div className='-mr-2 hidden items-center gap-1 lg:flex'>
                {selectedValues.size > 2 ? (
                  <Badge variant='secondary' className='text-muted-foreground'>
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  selectedOptions.map((option) => (
                    <Badge key={option.value} variant='secondary' className='text-muted-foreground'>
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
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelect(option, isSelected)}>
                    <Checkbox checked={isSelected} />
                    {option.icon && <option.icon />}
                    <span className='truncate capitalize'>{option.label}</span>
                    {option.count && (
                      <span className='ml-auto text-xs text-muted-foreground'>
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
                  <CommandItem onSelect={() => handleReset()} className='justify-center text-center'>
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
