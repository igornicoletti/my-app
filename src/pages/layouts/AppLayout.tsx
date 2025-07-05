import { isValidElement } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import {
  BreadcrumbPath, CommandMenu, NavigationTree, Separator,
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider, SidebarTrigger,
  ThemeSwitcher, UserMenu, WorkspaceSwitcher
} from '@/components'
import { ROUTE } from '@/configs'
import { getProtectedRoutes } from '@/routers'
import { getNavigationTree } from '@/utils'

const user = {
  name: 'Igor Nicoletti',
  email: 'example@example.com',
  avatar: '/unnamed.jpg',
}

const workspaces = [{
  name: '2Ti Technology',
  createdBy: 'Business',
}]

export const AppLayout = () => {
  const { pathname } = useLocation()

  const appLayoutRoute = getProtectedRoutes().find((route) => isValidElement(route.element) && route.element.type === ROUTE.AppLayout)
  const navigationItems = getNavigationTree(appLayoutRoute?.children || [], pathname)

  return (
    <SidebarProvider>
      <Sidebar collapsible='icon'>
        <SidebarHeader>
          <WorkspaceSwitcher workspaces={workspaces} />
        </SidebarHeader>
        <SidebarContent>
          <NavigationTree items={navigationItems} />
        </SidebarContent>
        <SidebarFooter>
          <UserMenu user={user} />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className='flex w-full h-16 shrink-0 items-center justify-between px-2 gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2'>
            <SidebarTrigger />
            <Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-4' />
            <BreadcrumbPath />
          </div>
          <div className='flex items-center gap-2'>
            <CommandMenu />
            <ThemeSwitcher variant='ghost' />
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}