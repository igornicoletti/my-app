import { CommonBreadcrumb } from '@/components/common/breadcrumb'
import { SidebarNavigation } from '@/components/sidebar/navigation'
import { SidebarTeam } from '@/components/sidebar/team'
import { SidebarUser } from '@/components/sidebar/user'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider, SidebarRail, SidebarTrigger } from '@/components/ui/sidebar'
import { useAuth } from '@/providers/auth'
import { useCommand } from '@/providers/command'
import { useTheme } from '@/providers/theme'
import { routeNavigations } from '@/routes/config/navigation'
import { ServiceAuth } from '@/services/auth'
import { CodaLogoIcon, LastfmLogoIcon, MagnifyingGlassIcon, MoonIcon, NyTimesLogoIcon, SignOutIcon, SunIcon } from '@phosphor-icons/react'
import { Navigate, Outlet } from 'react-router-dom'

const teams = [
  {
    name: 'Acme Inc',
    logo: NyTimesLogoIcon,
    plan: 'Enterprise',
  },
  {
    name: 'Acme Corp.',
    logo: CodaLogoIcon,
    plan: 'Startup',
  },
  {
    name: 'Evil Corp.',
    logo: LastfmLogoIcon,
    plan: 'Free',
  },
]

export const LayoutApp = () => {
  const { user } = useAuth()
  const { openCommand } = useCommand()
  const { theme, toggleTheme } = useTheme()

  if (!user || !user.emailVerified) {
    return <Navigate to='/login' replace />
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible='icon'>
        <SidebarHeader>
          <SidebarTeam teams={teams} />
        </SidebarHeader>
        <SidebarContent>
          {routeNavigations.map((group) => (
            <SidebarNavigation key={group.label} label={group.label} items={group.items} />))}
        </SidebarContent>
        <SidebarFooter>
          <SidebarUser user={user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 p-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex flex-1 items-center gap-2 p-2'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-4' />
            <CommonBreadcrumb />
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
          </div>
        </header>
        <div className='@container/main flex flex-1 flex-col p-2'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
