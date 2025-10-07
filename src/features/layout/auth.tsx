import { Button } from '@/components/ui/button'
import { authHero } from '@/constants/heroes'
import { useHero } from '@/hooks/use-hero'
import { useAuth } from '@/providers/auth'
import { ProviderHero } from '@/providers/hero'
import type { AuthHero } from '@/types/hero'
import { FireIcon } from '@phosphor-icons/react'
import { Link, Navigate, Outlet } from 'react-router-dom'

const AuthContent = () => {
  const { user } = useAuth()
  const { hero } = useHero()
  const authHeroData = hero as AuthHero

  if (user && user.emailVerified) {
    return <Navigate to='/dashboard' replace />
  }

  return (
    <div className='flex min-h-svh flex-col bg-background'>
      <main className='flex flex-1 items-center justify-center py-12'>
        <div className='w-full max-w-md space-y-6 p-6'>
          <header className='space-y-2 text-center'>
            <FireIcon className='mx-auto size-8 text-primary' />
            <h1 className='text-xl font-semibold tracking-tight'>
              {authHeroData?.heading}
            </h1>
            <p className='text-sm text-muted-foreground text-balance'>
              {authHeroData?.subheading}
            </p>
          </header>

          <Outlet />

          <footer className='mt-8 text-center text-sm text-muted-foreground'>
            {authHeroData?.question}{' '}
            <Button asChild variant='link' className='h-auto p-0 font-medium'>
              <Link to={authHeroData?.linkTo || '#'}>{authHeroData?.linkLabel}</Link>
            </Button>
          </footer>
        </div>
      </main>
    </div>
  )
}

export const LayoutAuth = () => {
  return (
    <ProviderHero collection={authHero}>
      <AuthContent />
    </ProviderHero>
  )
}
