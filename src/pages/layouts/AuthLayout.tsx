import { Link, Outlet } from 'react-router-dom'

import { Button } from '@/components'
import { useHero, useMeta } from '@/hooks'

export const AuthLayout = () => {
  useMeta()
  const data = useHero()

  return (
    <div className='relative flex min-h-svh flex-col'>
      <div className='flex flex-1 flex-col items-center justify-center py-12'>
        <div className='w-full max-w-md grid gap-6 px-6'>
          <div className='grid gap-2 text-center'>
            <h2 className='text-xl font-bold'>{data.heading}</h2>
            <p className='text-sm text-muted-foreground'>{data.subheading}</p>
          </div>
          <Outlet />
          <p className='text-sm text-muted-foreground text-center'>
            {data.question}{' '}
            <Button asChild variant='link' className='p-0 font-medium'>
              <Link to={data.linkTo}>
                {data.linkLabel}
              </Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}