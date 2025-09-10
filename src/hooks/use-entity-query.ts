import { useToast } from '@/hooks/use-toast'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

interface UseEntityQueryProps<T> {
  queryKey: string[]
  service: {
    get: () => Promise<T[]>
    seed?: (count: number) => Promise<T[]>
  }
  seedCount?: number
  entityName: string
}

export const useEntityQuery = <T>({
  queryKey,
  service,
  seedCount = 50,
  entityName,
}: UseEntityQueryProps<T>) => {
  const { errorToast } = useToast()

  const queryResult = useQuery<T[], Error>({
    queryKey,
    queryFn: async () => {
      const data = await service.get()
      if (data.length === 0 && service.seed) {
        return await service.seed(seedCount)
      }
      return data
    },
    initialData: [],
  })

  useEffect(() => {
    if (queryResult.isError) {
      const errorMessage = queryResult.error?.message || 'Unknown error occurred'
      errorToast({
        title: `Failed to fetch ${entityName}`,
        description: `${errorMessage}`,
      })
    }
  }, [queryResult.isError, queryResult.error])

  return queryResult
}
