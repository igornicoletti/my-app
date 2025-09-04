import { MagnifyingGlassIcon, MoonIcon, SignOutIcon, SunIcon } from '@phosphor-icons/react'
import { Outlet } from 'react-router-dom'

import { BreadcrumbPath } from '@/components/common/breadcrumb-path'
import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useCommand } from '@/providers/command-provider'
import { useTheme } from '@/providers/theme-provider'
import { authService } from '@/services/auth-service'

export const AppLayout = () => {
  const { openCommand } = useCommand()
  const { theme, toggleTheme } = useTheme()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 p-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex flex-1 items-center gap-2'>
            <SidebarTrigger className='-ml-1' />
            <Separator
              orientation='vertical'
              className='mr-2 data-[orientation=vertical]:h-4' />
            <BreadcrumbPath />
          </div>
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
        </header>
        <div className='@container/main flex flex-1 flex-col p-2'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
