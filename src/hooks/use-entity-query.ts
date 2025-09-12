import { useToast } from '@/hooks/use-toast'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

type EntityQueryHookOptions<T> = {
  queryKey: string[]
  service: {
    get: () => Promise<T[]>
    seed: (count: number) => Promise<T[]>
  }
  seedCount?: number
  errorTitle: string
}

export const createEntityQueryHook = <T>({
  queryKey,
  service,
  seedCount = 50,
  errorTitle,
}: EntityQueryHookOptions<T>) => {
  return () => {
    const { errorToast } = useToast()

    const queryResult = useQuery<T[], Error>({
      queryKey,
      queryFn: async () => {
        const data = await service.get()
        if (data.length === 0) {
          return await service.seed(seedCount)
        }
        return data
      },
      initialData: [],
    })

    useEffect(() => {
      if (queryResult.isError) {
        errorToast({
          title: errorTitle,
          description: queryResult.error?.message || 'Unknown error occurred',
        })
      }
    }, [queryResult.isError, queryResult.error])

    return queryResult
  }
}
