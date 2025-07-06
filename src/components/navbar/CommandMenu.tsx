import React, { isValidElement, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Button, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from '@/components'
import { ROUTE } from '@/configs'
import { getProtectedRoutes } from '@/routers/protected.routes'
import { getNavigationTree } from '@/utils'

export const CommandMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const appLayoutRoute = getProtectedRoutes().find((route) =>
    isValidElement(route.element) && route.element.type === ROUTE.AppLayout)

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
      <Button onClick={() => setIsOpen((prev) => !prev)} variant='secondary' size='sm' className='text-muted-foreground bg-sidebar gap-16'>
        Quick command{' '}
        <CommandShortcut className='rounded border px-1.5 py-0.5'>⌘J</CommandShortcut>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='App'>
            {navigationItems.map((item) => (
              <React.Fragment key={item.url}>
                <CommandItem onSelect={() => handleSelect(item.url)}>
                  {item.Icon && <item.Icon />}
                  {item.title}
                </CommandItem>
                {item.subItems?.map((subItem) => (
                  <CommandItem key={subItem.url} onSelect={() => handleSelect(subItem.url)}>
                    <span className='ml-6'>{subItem.title}</span>
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
