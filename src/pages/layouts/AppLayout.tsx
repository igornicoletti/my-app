import { isValidElement } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import {
  BreadcrumbPath, CommandMenu, NavigationTree, Separator,
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider, SidebarRail, SidebarTrigger,
  ThemeSwitcher, UserMenu, WorkspaceSwitcher
} from '@/components'
import { ROUTE } from '@/configs'
import { useAuth } from '@/contexts'
import { getProtectedRoutes } from '@/routers/protected.routes'
import { getNavigationTree } from '@/utils'

const workspaces = [{
  title: '2Ti Corp.',
  description: 'Enterprise',
  avatar: '',
}, {
  title: 'i.Go Inc.',
  description: 'Enterprise',
  avatar: '',
}]

export const AppLayout = () => {
  const { user, isLoading } = useAuth()
  const { pathname } = useLocation()

  if (isLoading || !user) return null

  const appLayoutRoute = getProtectedRoutes().find((route) =>
    isValidElement(route.element) && route.element.type === ROUTE.AppLayout)

  const navigationItems = getNavigationTree(appLayoutRoute?.children || [], pathname)

  const userData = {
    title: user.displayName!,
    description: user.email!,
    avatar: user?.photoURL ?? ''
  }

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
          <UserMenu user={userData} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className="flex w-full items-center gap-2 px-4">
            <SidebarTrigger />
            <Separator orientation='vertical' className='mx-2 data-[orientation=vertical]:h-4' />
            <BreadcrumbPath />
            <div className="ml-auto flex items-center">
              <CommandMenu />
              <Separator orientation='vertical' className='mx-2 data-[orientation=vertical]:h-4' />
              <ThemeSwitcher />
            </div>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 px-6 py-4'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
