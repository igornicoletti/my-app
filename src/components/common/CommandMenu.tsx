import {
  CommandDialog, CommandEmpty,
  CommandGroup, CommandInput,
  CommandItem, CommandList
} from '@/components'
import { useCommand } from '@/contexts'
import { useNavigation } from '@/hooks'
import React from 'react'
import { Link } from 'react-router-dom'

export const CommandMenu = () => {
  const { open, setOpen } = useCommand()
  const navigation = useNavigation()

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder='Type a command or search...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Go to...'>
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
                    {subItem.Icon && <subItem.Icon />}
                    {subItem.title}
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
