import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

import { Alert, AlertDescription } from '@/components'
import { TerminalIcon } from '@phosphor-icons/react'

export const ErrorFallback = () => {
  const error = useRouteError()

  let title = 'Unexpected Error'
  let message = 'Sorry, an unexpected error occurred. Please try again later.'

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        title = '404 - Page Not Found'
        message = 'The page you are looking for does not exist or has been moved.'
        break
      case 401:
        title = '401 - Unauthorized'
        message = 'You do not have permission to access this resource.'
        break
      case 403:
        title = '403 - Forbidden'
        message = 'Your credentials do not allow this action.'
        break
      case 500:
        title = '500 - Internal Server Error'
        message = 'Something went wrong on our servers. We are working to fix it.'
        break
      default:
        title = `${error.status} - ${error.statusText || 'Unexpected Error'}`
        message = error.data?.message || 'An error occurred during navigation.'
    }
  } else if (error instanceof Error) {
    message = error.message
  } else if (typeof error === 'string') {
    message = error
  }

  const stack = import.meta.env.DEV && error instanceof Error ? error.stack : undefined

  return (
    <div className='relative flex min-h-svh flex-col'>
      <div className='flex flex-1 flex-col items-center justify-center py-12'>
        <div className='w-full max-w-7xl grid gap-6 px-6'>
          <div className='grid gap-2 text-center'>
            <h2 className='text-xl font-bold'>{title}</h2>
            <p className='text-sm text-muted-foreground'>{message}</p>
          </div>
          {stack && (
            <Alert variant='destructive'>
              <TerminalIcon />
              <AlertDescription>
                <pre>
                  <code>{stack}</code>
                </pre>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}
