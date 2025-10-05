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
    <div className='relative flex min-h-svh flex-col'>
      <div className='flex flex-1 flex-col items-center justify-center py-12'>
        <div className='w-full max-w-md flex flex-col gap-6 px-6'>
          <header className='grid gap-2 text-center'>
            <FireIcon className='mx-auto size-8 text-primary' />
            <h2 className='text-xl font-medium'>{authHeroData?.heading}</h2>
            <p className='text-sm text-muted-foreground'>{authHeroData?.subheading}</p>
          </header>
          <Outlet />
          <footer className='text-center'>
            <div className='text-sm text-muted-foreground'>
              {authHeroData?.question}{' '}
              <Button asChild variant='link' className='p-0 font-medium'>
                <Link to={authHeroData?.linkTo || '#'}>{authHeroData?.linkLabel}</Link>
              </Button>
            </div>
          </footer>
        </div>
      </div>
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
