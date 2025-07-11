import { useNavigate } from 'react-router-dom'

import { ArrowLeftIcon } from '@phosphor-icons/react'

import {
  Button
} from '@/components'

export const NotFound = () => {
  const navigate = useNavigate()

  const handleBack = () =>
    window.history.length > 2
      ? navigate(-1)
      : navigate('/', { replace: true })

  return (
    <div className='relative flex min-h-svh flex-col'>
      <div className='flex flex-1 flex-col items-center justify-center py-12'>
        <div className='w-full max-w-md grid gap-6 px-6'>

          <header className='grid gap-2 text-center'>
            <h2 className='text-xl font-medium'>404</h2>
            <p className='text-sm text-muted-foreground'>This page could not be found.</p>
          </header>
          <Button onClick={handleBack} variant='link'>
            <ArrowLeftIcon />
            Go back
          </Button>

        </div>
      </div>
    </div>
  )
}
