import React from 'react'
import { Link } from 'react-router-dom'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components'
import { useNavigation } from '@/hooks'

type CommandMenuProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CommandMenu = ({ open, onOpenChange }: CommandMenuProps) => {
  const navigation = useNavigation()
  const handleSelect = () => onOpenChange(false)

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder='Type a command or search...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Main'>
          {navigation.map((item) => (
            <React.Fragment key={item.url}>
              <CommandItem asChild onSelect={handleSelect}>
                <Link to={item.url}>
                  {item.Icon && <item.Icon />}
                  {item.title}
                </Link>
              </CommandItem>
              {item.subItems?.map((subItem) => (
                <CommandItem asChild key={subItem.url} onSelect={handleSelect}>
                  <Link to={subItem.url}>
                    <span className='ml-6'>{subItem.title}</span>
                  </Link>
                </CommandItem>
              ))}
            </React.Fragment>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
