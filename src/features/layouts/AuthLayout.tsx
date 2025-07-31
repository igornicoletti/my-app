import { Link, Outlet } from 'react-router-dom'

import { FireIcon } from '@phosphor-icons/react'

import { Button } from '@/components'
import { useHero } from '@/hooks'

export const AuthLayout = () => {
  const { hero } = useHero()

  return (
    <div className='relative flex min-h-svh flex-col'>
      <div className='flex flex-1 flex-col items-center justify-center py-12'>
        <div className='w-full max-w-md flex flex-col gap-6 px-6'>
          <header className='grid gap-2 text-center'>
            <FireIcon className='mx-auto size-8 text-primary' />
            <h2 className='text-xl font-bold'>{hero.heading}</h2>
            <p className='text-sm text-muted-foreground'>{hero.subheading}</p>
          </header>
          <Outlet />
          <footer className='text-center'>
            <p className='text-sm text-muted-foreground'>
              {hero.question}{' '}
              <Button asChild variant='link' className='p-0 font-semibold'>
                <Link to={hero.linkTo}>{hero.linkLabel}</Link>
              </Button>
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}
