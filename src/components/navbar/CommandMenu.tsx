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
import { useCommand } from '@/contexts'
import { useNavigation } from '@/hooks'

export const CommandMenu = () => {
  const navigation = useNavigation()
  const { open, setOpen } = useCommand()

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder='Type a command or search...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Main'>
          {navigation.map((item) => (
            <React.Fragment key={item.url}>
              <CommandItem asChild onSelect={() => setOpen(false)}>
                <Link to={item.url}>
                  {item.Icon && <item.Icon />}
                  {item.title}
                </Link>
              </CommandItem>
              {item.subItems?.map((subItem) => (
                <CommandItem asChild key={subItem.url} onSelect={() => setOpen(false)}>
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
