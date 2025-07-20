import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

import { TerminalIcon } from '@phosphor-icons/react'

import {
  Alert,
  AlertDescription
} from '@/components'

export const ErrorFallback = () => {
  const error = useRouteError()

  const getErrorDetails = () => {
    if (isRouteErrorResponse(error)) {
      const { status, statusText, data } = error

      switch (status) {
        case 404:
          return {
            title: '404 - Page Not Found',
            message: 'The page you are looking for does not exist or has been moved.'
          }
        case 401:
          return {
            title: '401 - Unauthorized',
            message: 'You do not have permission to access this resource.'
          }
        case 403:
          return {
            title: '403 - Forbidden',
            message: 'Your credentials do not allow this action.'
          }
        case 500:
          return {
            title: '500 - Internal Server Error',
            message: 'Something went wrong on our servers. We are working to fix it.'
          }
        default:
          return {
            title: `${status} - ${statusText || 'Unexpected Error'}`,
            message: data?.message || 'An error occurred during navigation.'
          }
      }
    }

    if (error instanceof Error) {
      return {
        title: 'Unexpected Error',
        message: error.message
      }
    }

    if (typeof error === 'string') {
      return {
        title: 'Unexpected Error',
        message: error
      }
    }

    return {
      title: 'Unexpected Error',
      message: 'Sorry, an unexpected error occurred. Please try again later.'
    }
  }

  const { title, message } = getErrorDetails()
  const stack = import.meta.env.DEV && error instanceof Error
    ? error.stack
    : null

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
