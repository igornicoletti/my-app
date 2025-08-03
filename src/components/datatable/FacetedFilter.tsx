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
  CommandSeparator
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import type { TColumnOption, TFacetedFilterProps } from '@/types'
import { FunnelSimpleIcon, XIcon } from '@phosphor-icons/react'
import { useCallback } from 'react'

export const FacetedFilter = <TData, TValue>({ column, title, options }: TFacetedFilterProps<TData, TValue>) => {
  const columnFilterValue = column?.getFilterValue()
  const selectedValues = new Set<string>(Array.isArray(columnFilterValue) ? columnFilterValue : [])
  const selectedOptions = options.filter((option) => selectedValues.has(option.value))

  const handleSelect = useCallback((option: TColumnOption, isSelected: boolean) => {
    if (!column) return

    const current = column.getFilterValue()
    const valueSet = new Set<string>(Array.isArray(current) ? current : [])

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
              <Badge variant='secondary' className='text-muted-foreground lg:hidden'>
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
      <PopoverContent align='start' className='w-48 p-0'>
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelect(option, selectedValues.has(option.value))}>
                  <Checkbox checked={selectedValues.has(option.value)} />
                  {option.icon && <option.icon />}
                  <span className='truncate capitalize'>{option.label}</span>
                  {option.count !== undefined && (
                    <span className='ml-auto text-xs text-muted-foreground'>
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
