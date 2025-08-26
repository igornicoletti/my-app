import { useEffect } from 'react'
import { useFetcher } from 'react-router-dom'
import { toast } from 'sonner'

type Handlers = {
  onCreate?: () => void
  onUpdate?: () => void
  onDelete?: () => void
  onError?: (error: string) => void
}

export const useTaskFetcher = (
  fetcher: ReturnType<typeof useFetcher>,
  handlers: Handlers = {}
) => {
  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      const { error } = fetcher.data as { error?: string }

      const formData = fetcher.formData as FormData | undefined
      const intent = formData?.get('intent') as string | null

      if (error) {
        let message = ''

        if (typeof error === 'string') {
          message = error
        } else if (typeof error === 'object') {
          const fieldErr = (error as any).fieldErrors
          const formErr = (error as any).formErrors

          if (formErr?.length) {
            message = formErr[0]
          } else if (fieldErr) {
            const firstField = Object.keys(fieldErr)[0]
            message = fieldErr[firstField]?.[0] ?? 'Validation error'
          } else {
            message = 'Unknown error'
          }
        }

        toast.error(message)
        handlers.onError?.(message)
        return
      }

      switch (intent) {
        case 'createTask':
          toast.success('Task created')
          handlers.onCreate?.()
          break
        case 'updateTask':
          toast.success('Task updated')
          handlers.onUpdate?.()
          break
        case 'deleteTask':
        case 'deleteTasks':
          toast.success('Task deleted')
          handlers.onDelete?.()
          break
      }
    }
  }, [fetcher.state, fetcher.data, fetcher.formData, handlers])
}
