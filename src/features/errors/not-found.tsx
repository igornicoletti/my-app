import { Separator } from '@/components/ui/separator'

export const NotFoundPage = () => (
  <div className='relative flex min-h-svh flex-col'>
    <div className='flex flex-1 flex-col items-center justify-center py-12'>
      <div className='w-full max-w-7xl flex flex-col gap-6 px-6'>
        <div className='flex items-center justify-center gap-2'>
          <h2 className='text-lg font-bold'>404</h2>
          <Separator orientation='vertical' />
          <p className='text-sm text-muted-foreground'>This page could not be found.</p>
        </div>
      </div>
    </div>
  </div>
)
