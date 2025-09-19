import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { Option } from '@/types/data-table'
import { FunnelSimpleIcon, XIcon } from '@phosphor-icons/react'
import type { Column } from '@tanstack/react-table'
import { useCallback, useMemo, useState, type MouseEvent } from 'react'

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

  const selectedValues = useMemo(() => {
    return new Set(Array.isArray(columnFilterValue) ? columnFilterValue : [])
  }, [columnFilterValue])

  const facetedCounts = useMemo(() => {
    if (!column) return new Map<string, number>()
    return column.getFacetedUniqueValues()
  }, [column?.getFacetedUniqueValues(), column?.getFilterValue()])

  const onItemSelect = useCallback((option: Option, isSelected: boolean) => {
    if (!column) return

    let newFilterValues: TValue[] = []
    if (multiple) {
      const currentSelected = new Set(selectedValues)
      if (isSelected) {
        currentSelected.delete(option.value)
      } else {
        currentSelected.add(option.value)
      }
      newFilterValues = Array.from(currentSelected) as TValue[]
    } else {
      newFilterValues = isSelected ? [] : [option.value as TValue]
      setOpen(false)
    }

    column.setFilterValue(newFilterValues.length ? newFilterValues : undefined)
  }, [column, multiple, selectedValues])

  const onReset = useCallback((event?: MouseEvent) => {
    event?.stopPropagation()
    column?.setFilterValue(undefined)
  }, [column])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='border-dashed'>
          {selectedValues?.size > 0 ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  role='button'
                  aria-label={`Clear ${title} Filter`}
                  tabIndex={0}
                  onClick={onReset}>
                  <XIcon />
                </div>
              </TooltipTrigger>
              <TooltipContent>Clear {title} Filter</TooltipContent>
            </Tooltip>
          ) : (
            <FunnelSimpleIcon />
          )}
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation='vertical' className='mx-0.5 data-[orientation=vertical]:h-4' />
              <Badge variant='secondary' className='lg:hidden'>
                {selectedValues.size}
              </Badge>
              <div className='hidden items-center gap-1 lg:flex'>
                {selectedValues.size > 2 ? (
                  <Badge variant='secondary'>
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options.filter(option => selectedValues.has(option.value)).map(option => (
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
      <PopoverContent className='w-auto p-0' align='start'>
        <Command>
          <CommandInput placeholder={title ? `Filter ${title}...` : 'Filter...'} />
          <CommandList className='max-h-full'>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className='max-h-72 overflow-y-auto overflow-x-hidden'>
              {options.map((option) => {
                const count = facetedCounts.get(option.value) ?? 0
                return (
                  <CommandItem key={option.value} onSelect={() => onItemSelect(option, selectedValues.has(option.value))}>
                    <div className='w-full flex items-center gap-2'>
                      <Checkbox
                        checked={selectedValues.has(option.value)}
                        onCheckedChange={() => onItemSelect(option, selectedValues.has(option.value))}
                        onClick={(e) => e.stopPropagation()} />
                      {option.icon && <option.icon className='text-muted-foreground' />}
                      <p className='max-w-48 truncate'>{option.label}</p>
                      {count !== undefined && (
                        <p className='ml-auto font-mono text-xs text-muted-foreground'>{count}</p>
                      )}
                    </div>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={() => onReset()} className='justify-center text-center'>
                    Clear filter
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
