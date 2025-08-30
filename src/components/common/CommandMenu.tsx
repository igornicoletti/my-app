import { Link } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import { useCommand } from '@/providers'
import { routeNavigations } from '@/routes'

export const CommandMenu = () => {
  const { open, setOpen } = useCommand()

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder='Type a command or search...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {routeNavigations.map((group, i) => (
          <Fragment key={group.label}>
            <CommandGroup heading={group.label ?? 'Go to...'}>
              {group.items.map((item) => (!item.items || item.items.length === 0) ? (
                <CommandItem
                  asChild
                  key={item.url ?? item.title}
                  onSelect={() => setOpen(false)}>
                  <Link to={item.url}>
                    {item.icon && <item.icon />}
                    {item.title}
                  </Link>
                </CommandItem>
              ) : (
                item.items.map((subItem) => (
                  <CommandItem
                    asChild
                    key={subItem.url ?? subItem.title}
                    onSelect={() => setOpen(false)}>
                    <Link to={subItem.url}>
                      {subItem.icon && <subItem.icon />}
                      {subItem.title}
                    </Link>
                  </CommandItem>
                ))
              ))}
            </CommandGroup>
            {i !== routeNavigations.length - 1 && <CommandSeparator />}
          </Fragment>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
