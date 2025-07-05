import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { BreadcrumbNavbar, DynamicNavigation, Separator, Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider, SidebarTrigger, ThemeSwitcher, UserMenu, WorkspaceSwitcher } from '@/components'
import { ROUTE } from '@/configs'
import { useMeta } from '@/hooks'
import { mapRoutesToSidebar } from '@/utils'

import { getProtectedRoutes } from '@/routers/protected.routes'

const user = {
  name: 'Igor Nicoletti',
  email: 'example@example.com',
  avatar: '/unnamed.jpg',
}

const workspaces = [{
  name: 'Wad LTDA.',
  createdBy: 'Enterprise',
}, {
  name: 'Asdf ME.',
  createdBy: 'Startup',
}]

export const AppLayout = () => {
  useMeta()
  const { pathname } = useLocation()
  const appLayoutRoute = getProtectedRoutes().find(route => React.isValidElement(route.element) && route.element.type === ROUTE.AppLayout)
  const dynamicItems = mapRoutesToSidebar(appLayoutRoute?.children || [], pathname)

  return (
    <SidebarProvider>
      <Sidebar collapsible='icon'>
        <SidebarHeader>
          <WorkspaceSwitcher workspaces={workspaces} />
        </SidebarHeader>
        <SidebarContent>
          <DynamicNavigation items={dynamicItems} />
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
            <BreadcrumbNavbar />
          </div>
          <div className='flex items-center gap-2'>
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