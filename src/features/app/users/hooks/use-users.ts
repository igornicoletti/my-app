import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import type { UserSchema } from '@/features/app/users/lib/schemas'
import { useToast } from '@/hooks/use-toast'
import { usersService } from '@/services/users-service'

export const useUsers = () => {
  const { errorToast } = useToast()

  const queryResult = useQuery<UserSchema[], Error>({
    queryKey: ['users'],
    queryFn: async () => {
      const users = await usersService.get()
      if (users.length === 0) {
        return await usersService.seed(50)
      }
      return users
    },
    initialData: []
  })

  useEffect(() => {
    if (queryResult.isError) {
      const errorMessage = queryResult.error?.message || 'Unknown error occurred'
      errorToast({
        title: 'Failed to fetch users',
        description: `${errorMessage}`
      })
    }
  }, [queryResult.isError, queryResult.error])

  return queryResult
}
