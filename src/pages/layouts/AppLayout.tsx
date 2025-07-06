// src/layouts/AppLayout.tsx
import { isValidElement } from 'react' // Adicionado useEffect
import { Outlet, useLocation } from 'react-router-dom' // Adicionado useNavigate

import {
  BreadcrumbPath, CommandMenu, NavigationTree, Separator,
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider, SidebarTrigger,
  ThemeSwitcher, UserMenu, WorkspaceSwitcher
} from '@/components'
import { ROUTE } from '@/configs'
import { useAuth } from '@/contexts'
import { getProtectedRoutes } from '@/routers/protected.routes'
import { getNavigationTree } from '@/utils'

const workspaces = [{
  name: '2Ti Technology',
  createdBy: 'Business',
}]

export const AppLayout = () => {
  const { user, isLoading } = useAuth()

  const { pathname } = useLocation()

  if (isLoading || !user) return null

  const userData = {
    name: user.displayName!,
    email: user.email!,
    avatar: user?.photoURL ?? ''
  }

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
          <UserMenu user={userData} />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className='flex h-16 shrink-0 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className="w-full flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-6' />
              <BreadcrumbPath />
            </div>
            <div className="flex items-center gap-2">
              <CommandMenu />
              <Separator orientation='vertical' className='data-[orientation=vertical]:h-6' />
              <ThemeSwitcher />
            </div>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}