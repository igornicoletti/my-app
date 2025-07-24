import { Outlet } from 'react-router-dom'

import { MagnifyingGlassIcon, SignOutIcon } from '@phosphor-icons/react'

import {
  AppSidebar,
  BreadcrumbPath,
  Button,
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  ThemeSwitcher
} from '@/components'
import { useCommand } from '@/contexts'
import { authService } from '@/services'

export const AppLayout = () => {
  const { openCommand } = useCommand()

  return (
    <SidebarProvider>
      <AppSidebar variant='floating' />
      <SidebarInset>
        <header className='flex h-16 md:h-22 shrink-0 items-center gap-2 ease-linear transition-[width,height] group-has-data-[collapsible=icon]/sidebar-wrapper:h-16'>
          <div className='flex w-full items-center gap-4 px-2'>
            <SidebarTrigger />
            <Separator orientation='vertical' />
            <BreadcrumbPath />
            <div className='ml-auto'>
              <Button onClick={openCommand} size='icon' variant='ghost'>
                <MagnifyingGlassIcon />
              </Button>
              <ThemeSwitcher />
              <Button onClick={() => authService.signOut()} size='icon' variant='ghost'>
                <SignOutIcon />
              </Button>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
