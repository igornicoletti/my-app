import { SwirlingSpinner } from '@/components/ui/spinner'

export const LoadingSpinner = ({ message }: { message?: string }) => (
  <div className='relative flex min-h-svh flex-col'>
    <div className='flex flex-1 flex-col items-center justify-center py-12'>
      <div className='grid gap-6 px-6 text-center'>
        <SwirlingSpinner />
        {message && <p className='text-sm front-medium'>{message}</p>}
      </div>
    </div>
  </div>
)
