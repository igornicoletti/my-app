import { Separator } from '@/components'

export const NotFound = () => (
  <div className='relative flex min-h-svh flex-col'>
    <div className='flex flex-1 flex-col items-center justify-center py-12'>
      <div className='w-full max-w-md grid gap-6 px-6'>
        <div className='flex items-center justify-center gap-4'>
          <h2 className='text-xl font-bold'>404</h2>
          <Separator
            orientation='vertical'
            className='data-[orientation=vertical]:h-12'
          />
          <p className='text-sm text-muted-foreground'>This page could not be found.</p>
        </div>
      </div>
    </div>
  </div>
)