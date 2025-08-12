import { Outlet } from 'react-router-dom'

import { MagnifyingGlassIcon, MoonIcon, SignOutIcon, SunIcon } from '@phosphor-icons/react'

import {
  AppSidebar,
  BreadcrumbPath,
  Button,
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components'
import { useCommand, useTheme } from '@/contexts'
import { authService } from '@/services'

export const AppLayout = () => {
  const { openCommand } = useCommand()
  const { theme, toggleTheme } = useTheme()

  return (
    <SidebarProvider>
      <AppSidebar variant='floating' />
      <SidebarInset>
        <header className='flex h-16 md:h-22 shrink-0 items-center gap-2 ease-linear transition-[width,height] group-has-data-[collapsible=icon]/sidebar-wrapper:h-16'>
          <div className='flex w-full items-center gap-4 px-2'>
            <SidebarTrigger />
            <Separator orientation='vertical' className='mx-0.5 data-[orientation=vertical]:h-4' />
            <BreadcrumbPath />
            <div className='ml-auto'>
              <Button onClick={openCommand} size='icon' variant='ghost'>
                <MagnifyingGlassIcon />
              </Button>
              <Button onClick={toggleTheme} size='icon' variant='ghost'>
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </Button>
              <Button onClick={() => authService.signOut()} size='icon' variant='ghost'>
                <SignOutIcon />
              </Button>
            </div>
          </div>
        </header>
        <div className='flex flex-1 flex-col'>
          <div className='@container/main flex flex-1 flex-col'>
            <div className='flex flex-col p-4 pt-0'>
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
