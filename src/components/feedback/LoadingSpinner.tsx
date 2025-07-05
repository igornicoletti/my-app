import { SwirlingSpinner } from '@/components'

export const LoadingSpinner = ({ message }: { message?: string }) => (
  <div className='relative flex min-h-svh flex-col'>
    <div className='flex flex-1 flex-col items-center justify-center py-12'>
      <div className='grid gap-6 px-6'>
        <SwirlingSpinner />
        <p className='text-sm text-muted-foreground text-center'>{message}</p>
      </div>
    </div>
  </div>
)
