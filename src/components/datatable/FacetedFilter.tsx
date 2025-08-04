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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { TColumnOption, TFacetedFilterProps } from '@/types'
import { FunnelSimpleIcon, XIcon } from '@phosphor-icons/react'
import { useCallback, useMemo, useState } from 'react'

export const FacetedFilter = <TData, TValue>({ column, title, options, multiple }: TFacetedFilterProps<TData, TValue>) => {
  const [open, setOpen] = useState(false)

  const columnFilterValue = column?.getFilterValue()
  const selectedValues = useMemo(() => new Set(Array.isArray(columnFilterValue)
    ? columnFilterValue
    : []
  ), [columnFilterValue])

  const handleSelect = useCallback((option: TColumnOption, isSelected: boolean) => {
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

  const handleReset = useCallback((event?: React.MouseEvent) => {
    event?.stopPropagation()
    column?.setFilterValue(undefined)
  }, [column])

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
                  options.filter((option) => selectedValues.has(option.value)).map((option) => (
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
                  <span className='truncate'>{option.label}</span>
                  {option.count && (
                    <span className='ml-auto font-mono text-xs text-muted-foreground'>
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
