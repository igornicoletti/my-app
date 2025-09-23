import { CommonBreadcrumb } from '@/components/common/breadcrumb'
import { SidebarApp } from '@/components/sidebar/app'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useAuth } from '@/providers/auth'
import { useCommand } from '@/providers/command'
import { useTheme } from '@/providers/theme'
import { ServiceAuth } from '@/services/auth'
import { MagnifyingGlassIcon, MoonIcon, SignOutIcon, SunIcon } from '@phosphor-icons/react'
import { Navigate, Outlet } from 'react-router-dom'

export const LayoutApp = () => {
  const { user } = useAuth()
  const { openCommand } = useCommand()
  const { theme, toggleTheme } = useTheme()

  if (!user || !user.emailVerified) {
    return <Navigate to='/login' replace />
  }

  return (
    <SidebarProvider>
      <SidebarApp />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 p-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex flex-1 items-center gap-2'>
            <SidebarTrigger />
            <Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-4' />
            <CommonBreadcrumb />
          </div>
          <div className='ml-auto'>
            <Button onClick={openCommand} size='icon' variant='ghost'>
              <MagnifyingGlassIcon />
            </Button>
            <Button onClick={toggleTheme} size='icon' variant='ghost'>
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </Button>
            <Button onClick={() => ServiceAuth.signOut()} size='icon' variant='ghost'>
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
