import { useNavigate } from 'react-router-dom'

import { ArrowLeftIcon } from '@phosphor-icons/react'

import {
  Button,
  EffectHighlight,
  Separator
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
        <div className='w-full max-w-sm grid gap-6 px-6'>

          <div className='flex items-center justify-center gap-2'>
            <h2 className='text-xl font-medium'>404</h2>
            <Separator orientation='vertical' className='data-[orientation=vertical]:h-4' />
            <p className='text-sm text-muted-foreground'>This page could not be found.</p>
          </div>

          <Button onClick={handleBack} variant='secondary'>
            <ArrowLeftIcon />
            Go back
            <EffectHighlight />
          </Button>

        </div>
      </div>
    </div>
  )
}
