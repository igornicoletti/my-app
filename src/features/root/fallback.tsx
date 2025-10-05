import { Alert, AlertDescription } from '@/components/ui/alert'
import { TerminalIcon } from '@phosphor-icons/react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

type ErrorProps = {
  title: string
  message: string
}

const ERROR_MAP: Record<number, ErrorProps> = {
  401: {
    title: '401 - Unauthorized',
    message: 'You do not have permission to access this resource.',
  },
  403: {
    title: '403 - Forbidden',
    message: 'Your credentials do not allow this action.',
  },
  404: {
    title: '404 - Page Not Found',
    message: 'The page you are looking for does not exist or has been moved.',
  },
  500: {
    title: '500 - Internal Server Error',
    message: 'Something went wrong on our servers. We are working to fix it.',
  },
}

const getError = (error: unknown): ErrorProps => {
  if (isRouteErrorResponse(error)) {
    const status = error.status
    const statusText = error.statusText
    const data = (error as { data?: any }).data

    if (ERROR_MAP[status]) {
      return ERROR_MAP[status]
    }

    return {
      title: `${status} - ${statusText || 'Something Went Wrong'}`,
      message: data?.message || 'An error occurred during navigation.',
    }
  }

  if (error instanceof Error) {
    return {
      title: 'Error',
      message: error.message,
    }
  }

  return {
    title: 'Something Went Wrong',
    message: typeof error === 'string'
      ? error
      : 'Sorry, an unexpected error occurred. Please try again later.',
  }
}

export const RootFallback = () => {
  const error = useRouteError()
  const { title, message } = getError(error)

  const stack = import.meta.env.DEV && error instanceof Error
    ? error.stack
    : null

  return (
    <div className='relative flex min-h-svh flex-col'>
      <div className='flex flex-1 flex-col items-center justify-center py-12'>
        <div className='w-full max-w-7xl flex flex-col gap-6 px-6'>
          <div className='grid gap-2 text-center'>
            <h2 className='text-xl font-semibold'>{title}</h2>
            <p className='text-muted-foreground text-sm text-balance'>{message}</p>
          </div>
          {stack && (
            <Alert variant='destructive' role='alert'>
              <TerminalIcon />
              <AlertDescription>
                <code>{stack}</code>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}
