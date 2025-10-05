import { CommonBreadcrumb } from '@/components/common/breadcrumb'
import { SidebarApp } from '@/components/sidebar/sidebar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { appHero } from '@/constants/heroes'
import { useHero } from '@/hooks/use-hero'
import { useAuth } from '@/providers/auth'
import { useCommand } from '@/providers/command'
import { ProviderHero } from '@/providers/hero'
import { useTheme } from '@/providers/theme'
import { ServiceAuth } from '@/services/auth'
import { MagnifyingGlassIcon, MoonIcon, SignOutIcon, SunIcon } from '@phosphor-icons/react'
import { Navigate, Outlet } from 'react-router-dom'

const AppContent = () => {
  const { user } = useAuth()
  const { hero } = useHero()
  const { openCommand } = useCommand()
  const { theme, toggleTheme } = useTheme()

  if (!user || !user.emailVerified) {
    return <Navigate to='/login' replace />
  }

  return (
    <SidebarProvider>
      <SidebarApp collapsible='icon' user={user} />
      <SidebarInset>
        <header className='flex h-16 items-center gap-2 p-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex flex-1 items-center gap-2 p-2'>
            <SidebarTrigger className='-ml-1' />

            <Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-6' />

            <CommonBreadcrumb />

            <div className='ml-auto flex items-center gap-1'>
              <Button onClick={openCommand} size='icon' variant='ghost' title='Search (Ctrl+K)'>
                <MagnifyingGlassIcon />
              </Button>
              <Button onClick={toggleTheme} size='icon' variant='ghost' title='Toggle Theme'>
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </Button>
              <Button onClick={() => ServiceAuth.signOut()} size='icon' variant='ghost' title='Sign Out'>
                <SignOutIcon />
              </Button>
            </div>
          </div>
        </header>

        <main className='@container/main flex flex-1 flex-col p-4'>

          <div className='max-w-3xl space-y-1 pb-4'>
            <h1 className='text-2xl font-semibold tracking-tight'>{hero?.heading}</h1>
            <p className='text-muted-foreground text-sm text-balance'>{hero?.subheading}</p>
          </div>

          <div className='flex flex-1'>
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export const LayoutApp = () => {
  return (
    <ProviderHero collection={appHero}>
      <AppContent />
    </ProviderHero>
  )
}
