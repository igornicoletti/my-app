import React, { isValidElement, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Button, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components'
import { ROUTE } from '@/configs'
import { getProtectedRoutes } from '@/routers'
import { getNavigationTree } from '@/utils'

export const CommandMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const appLayoutRoute = getProtectedRoutes().find((route) => isValidElement(route.element) && route.element.type === ROUTE.AppLayout)
  const navigationItems = getNavigationTree(appLayoutRoute?.children || [], pathname)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleSelect = (url: string) => {
    setIsOpen(false)
    navigate(url)
  }

  return (
    <>
      <Button onClick={() => setIsOpen((prev) => !prev)} variant='ghost' className='text-muted-foreground'>
        Search{' '}
        <kbd className="pointer-events-none flex h-5 items-center justify-center px-1 rounded border text-xs font-sans">
          ⌘J
        </kbd>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='App'>
            {navigationItems.map((item) => (
              <React.Fragment key={item.title}>
                <CommandItem onSelect={() => handleSelect(item.url)}>
                  {item.Icon && <item.Icon />}
                  {item.title}
                </CommandItem>
                {item.subItems && item.subItems.map((subItem) => (
                  <CommandItem key={subItem.title} onSelect={() => handleSelect(subItem.url)}>
                    {subItem.title}
                  </CommandItem>
                ))}
              </React.Fragment>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}