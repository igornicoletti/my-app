import { Outlet } from 'react-router-dom'

import {
  BreadcrumbPath,
  Button,
  LoadingSpinner,
  NavigationTree,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  ThemeSwitcher,
  UserMenu,
  WorkspaceSwitcher
} from '@/components'
import { useAuth, useCommand } from '@/contexts'
import { useNavigation } from '@/hooks'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'

const workspaceData = [{
  title: '2Ti Corp.',
  description: 'Enterprise',
  avatar: '',
}]

export const AppLayout = () => {
  const { user, isLoading } = useAuth()
  const navigationData = useNavigation()
  const { openCommand } = useCommand()

  if (isLoading) return <LoadingSpinner />
  if (!user) return null

  const { displayName, email, photoURL } = user
  const userData = {
    title: displayName ?? '',
    description: email ?? '',
    avatar: photoURL ?? '',
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible='icon'>
        <SidebarHeader>
          <WorkspaceSwitcher workspace={workspaceData} />
        </SidebarHeader>
        <SidebarContent>
          <NavigationTree navigation={navigationData} />
        </SidebarContent>
        <SidebarFooter>
          <UserMenu user={userData} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className="flex items-center gap-4 px-4">
            <SidebarTrigger />
            <Separator orientation='vertical' />
            <BreadcrumbPath />
          </div>
          <div className="ml-auto flex items-center gap-4 px-4">
            <Button onClick={openCommand} size='icon' variant='ghost'>
              <MagnifyingGlassIcon />
            </Button>
            <ThemeSwitcher />
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 px-6 py-4'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
