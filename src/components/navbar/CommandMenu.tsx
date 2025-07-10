import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { AtIcon, ChatCircleIcon } from '@phosphor-icons/react'

import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut
} from '@/components'
import { useNavigation } from '@/hooks'

export const CommandMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigation = useNavigation()


  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <Button onClick={() => setIsOpen((prev) => !prev)} variant='ghost' className='hidden lg:flex gap-6 text-muted-foreground'>
        Command Menu{' '}
        <CommandShortcut>⌘K</CommandShortcut>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='General'>
            {navigation.map((item) => (
              <React.Fragment key={item.url}>
                <CommandItem asChild onSelect={() => setIsOpen(false)}>
                  <Link to={item.url}>
                    {item.Icon && <item.Icon />}
                    {item.title}
                  </Link>
                </CommandItem>
                {item.subItems?.map((subItem) => (
                  <CommandItem asChild key={subItem.url} onSelect={() => setIsOpen(false)}>
                    <Link to={subItem.url}>
                      <span className='ml-6'>{subItem.title}</span>
                    </Link>
                  </CommandItem>
                ))}
              </React.Fragment>
            ))}
          </CommandGroup>
          <CommandGroup heading='Help'>
            <CommandItem>
              <ChatCircleIcon />
              Send Feedback
            </CommandItem>
            <CommandItem>
              <AtIcon />
              Contact Support
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
